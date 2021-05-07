import assert from "assert";
import ItemService from "../../item/item.service";
import FakeItemRepository from "../fakers/fake.item.repository";

const fakeRepository = new FakeItemRepository();
const itemService = new ItemService(fakeRepository);

describe("ItemService", () => {
	const clearDB = () => {
		fakeRepository.clearDB();
	};
	beforeEach("clear db", clearDB);

	const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

	describe("addItem", () => {
		it("should successfully add and get one item", async () => {
			const item = {
				item: "foo",
				quantity: 5,
				expiry: Date.now() + 10000,
			};

			await itemService.addItem(item.item, item.quantity, item.expiry);

			const res = await itemService.getItem(item.item);

			assert.strictEqual(res.quantity, item.quantity);
			assert.strictEqual(res.validTill, item.expiry);
		});

		it("should successfully add and get multiple similar items", async () => {
			const item = "foo";
			const quantity1 = 5;
			const quantity2 = 412;
			const quantity3 = 521334;
			const expiry1 = Date.now() + 10000;
			const expiry2 = Date.now() + 20000;
			const expiry3 = Date.now() + 30000;

			await Promise.all([
				itemService.addItem(item, quantity1, expiry1),
				itemService.addItem(item, quantity2, expiry2),
				itemService.addItem(item, quantity3, expiry3),
			]);

			const res = await itemService.getItem(item);

			const totalQuantity = quantity1 + quantity2 + quantity3;
			assert.strictEqual(res.quantity, totalQuantity);
			assert.strictEqual(res.validTill, Math.min(expiry1, expiry2, expiry3));
		});

		it("should successfully add and get different items", async () => {
			const item1 = {
				item: "foo",
				quantity: 5,
				expiry: Date.now() + 10000,
			};
			const item2 = {
				item: "bar",
				quantity: 10,
				expiry: Date.now() + 30000,
			};
			const item3 = {
				item: "foobar",
				quantity: 5325,
				expiry: Date.now() + 30000,
			};

			await Promise.all([
				itemService.addItem(item1.item, item1.quantity, item1.expiry),
				itemService.addItem(item2.item, item2.quantity, item2.expiry),
				itemService.addItem(item3.item, item3.quantity, item3.expiry),
			]);

			const items = await Promise.all([
				itemService.getItem(item1.item),
				itemService.getItem(item2.item),
				itemService.getItem(item3.item),
			]);

			assert.strictEqual(items[0].quantity, item1.quantity);
			assert.strictEqual(items[0].validTill, item1.expiry);

			assert.strictEqual(items[1].quantity, item2.quantity);
			assert.strictEqual(items[1].validTill, item2.expiry);

			assert.strictEqual(items[2].quantity, item3.quantity);
			assert.strictEqual(items[2].validTill, item3.expiry);
		});
	});

	describe("getItem", () => {
		it("should successfully try to get an expired item", async () => {
			const item = {
				item: "foo",
				quantity: 5,
				expiry: Date.now() + 10,
			};

			await itemService.addItem(item.item, item.quantity, item.expiry);

			// making sure the item is expired
			await sleep(10);

			const res = await itemService.getItem(item.item);
			assert.strictEqual(res.quantity, 0);
			assert.strictEqual(res.validTill, null);
		});
	});

	describe("sellItem", () => {
		it("should successfully sell one item", async () => {
			const item = {
				item: "foo",
				quantity: 5,
				expiry: Date.now() + 10000,
			};

			const sellingQuantity = 4;
			await itemService.addItem(item.item, item.quantity, item.expiry);
			await itemService.sellItem(item.item, sellingQuantity);

			const res = await itemService.getItem(item.item);
			assert.strictEqual(res.quantity, item.quantity - sellingQuantity);
		});

		it("should successfully sell one item: closer to expiry", async () => {
			const item = "foo";
			const quantity1 = 5;
			const quantity2 = 4;
			const expiry1 = Date.now() + 10000;
			const expiry2 = Date.now() + 20000;

			await Promise.all([
				itemService.addItem(item, quantity1, expiry1),
				itemService.addItem(item, quantity2, expiry2),
			]);

			const sellingQuantity = 3;
			const availableQuantity = quantity1 + quantity2;

			await itemService.sellItem(item, sellingQuantity);

			const res = await itemService.getItem(item);
			assert.strictEqual(res.quantity, availableQuantity - sellingQuantity);
			assert.strictEqual(res.validTill, expiry1);
		});

		it("should successfully sell one item: different quantities", async () => {
			const item = "foo";
			const quantity1 = 5;
			const quantity2 = 4;
			const quantity3 = 5;
			const expiry1 = Date.now() + 10000;
			const expiry2 = Date.now() + 20000;
			const expiry3 = Date.now() + 30000;

			await Promise.all([
				itemService.addItem(item, quantity1, expiry1),
				itemService.addItem(item, quantity2, expiry2),
				itemService.addItem(item, quantity3, expiry3),
			]);

			const sellingQuantity = 10;
			const availableQuantity = quantity1 + quantity2 + quantity3;

			await itemService.sellItem(item, sellingQuantity);

			const res = await itemService.getItem(item);
			assert.strictEqual(res.quantity, availableQuantity - sellingQuantity);
			assert.strictEqual(res.validTill, expiry3);
		});

		it("should fail to sell: expired item", async () => {
			const item = {
				item: "foo",
				quantity: 5,
				expiry: Date.now() + 10,
			};

			const sellingQuantity = 4;
			await itemService.addItem(item.item, item.quantity, item.expiry);

			await sleep(10);

			await itemService.sellItem(item.item, sellingQuantity).catch((err) => {
				assert.strictEqual(err.message, "Item not found or expired");
			});
		});

		it("should fail to sell: max quantity reached", async () => {
			const item = {
				item: "foo",
				quantity: 5,
				expiry: Date.now() + 1000,
			};

			const sellingQuantity = 50;
			await itemService.addItem(item.item, item.quantity, item.expiry);

			await itemService.sellItem(item.item, sellingQuantity).catch((err) => {
				assert.strictEqual(
					err.message,
					"Given quantity is more than available quantity"
				);
			});
		});
	});
});
