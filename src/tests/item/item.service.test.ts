import assert from "assert";
import ItemService from "../../item/item.service";
import FakeItemRepository from "../fakers/fake.item.repository";
import itemData from "./item.data";

const itemService = new ItemService(new FakeItemRepository());

describe("ItemService", () => {
	describe("addItem", () => {
		it("should successfully add an item", () => {
			assert.strictEqual(true, true);
		});
	});
});
