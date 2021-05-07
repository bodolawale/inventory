import { IItem } from "./item.model";
import ItemRepository from "./item.repository";

export default class ItemService {
	private itemRepository: ItemRepository;

	constructor(itemRepository: ItemRepository) {
		this.itemRepository = itemRepository;
	}

	public async addItem(item: string, quantity: number, expiry: number) {
		return this.itemRepository.addItem({ item, quantity, expiry });
	}

	public async getItem(item: string) {
		const items = await this.itemRepository.getItem(item);

		if (items.length === 0) return { quantity: 0, validTill: null };

		return this.getTotalQuantity(items);
	}

	public async sellItem(item: string, quantity: number) {
		const items = await this.itemRepository.getItem(item);

		if (items.length === 0) throw new Error("Item not found or expired");

		const totalQuantity = items.reduce((acc, curr) => acc + curr.quantity, 0);

		if (quantity > totalQuantity)
			throw new Error("Given quantity is more than available quantity");

		await this.removeQuantity(quantity, items);
	}

	public async deleteExpiredItems() {
		await this.itemRepository.deleteExpiredItems();
	}

	private async removeQuantity(quantity: number, items: IItem[]) {
		const promises = [];

		for (const item of items) {
			if (quantity === 0) break;

			if (quantity >= item.quantity) {
				quantity -= item.quantity;
				promises.push(this.itemRepository.deleteItem(item.id));
				continue;
			}

			if (quantity < item.quantity) {
				promises.push(
					this.itemRepository.updateItemQuantity(
						item.id,
						item.quantity - quantity
					)
				);
				break;
			}
		}

		await Promise.all(promises);
	}

	private getTotalQuantity(items: IItem[]) {
		let quantity = 0;
		let validTill = Infinity;
		items.forEach((item) => {
			quantity += item.quantity;
			validTill = item.expiry < validTill ? item.expiry : validTill;
		});
		return { quantity, validTill };
	}
}
