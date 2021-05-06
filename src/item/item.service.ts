import ItemRepository from "./item.repository";

export default class ItemService {
	private itemRepository: typeof ItemRepository;

	constructor(itemRepository: typeof ItemRepository) {
		this.itemRepository = itemRepository;
	}

	public async getItem(item: string) {
		const items = await this.itemRepository.getItem(item);
		let quantity = 0;
		let validTill = Infinity;
		items.forEach((item) => {
			quantity += item.quantity;
			validTill = item.expiry < validTill ? item.expiry : validTill;
		});
		return { quantity, validTill };
	}
	public async addItem(item: string, quantity: number, expiry: number) {
		return this.itemRepository.addItem({ item, quantity, expiry });
	}
	public async sellItem() {}
}
