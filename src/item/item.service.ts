import ItemRepository from "./item.repository";

export default class ItemService {
	private itemRepository: typeof ItemRepository;

	constructor(itemRepository: typeof ItemRepository) {
		this.itemRepository = itemRepository;
	}

	public async getItem(item: string) {
		return this.itemRepository.getItem(item);
	}
	public async addItem(item: string, quantity: number, expiry: number) {
		return this.itemRepository.addItem({ item, quantity, expiry });
	}
	public async sellItem() {}
}
