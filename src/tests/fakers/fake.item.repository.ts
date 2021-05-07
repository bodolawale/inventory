import { IItem } from "./../../item/item.model";

export default class FakeItemRepository {
	private id: number;
	private items: IItem[];

	constructor() {
		this.id = 0;
		this.items = [];
	}

	async addItem(itemDTO: IItem) {
		this.id = this.id++;
		itemDTO.id = this.id;
		this.items.push(itemDTO);
	}

	async getItem(itemName: string) {
		const items = this.items.filter(
			({ item, expiry }) => item === itemName && expiry > Date.now()
		);
		return items.sort((a, b) => a.expiry - b.expiry);
	}

	async updateItemQuantity(id: number, quantity: number) {
		const index = this.getItemById(id);
		this.items[index].quantity = quantity;
	}

	async deleteItem(id: number) {
		const index = this.getItemById(id);
		this.items.splice(index, 1);
	}

	async deleteExpiredItems() {
		this.items = this.items.filter(({ expiry }) => expiry > Date.now());
	}

	private getItemById(itemId: number) {
		return this.items.findIndex(({ id }) => id === itemId);
	}

	async clearDB() {
		this.id = 0;
		this.items = [];
	}
}
