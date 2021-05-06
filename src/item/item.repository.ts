import Item, { IItem } from "./item.model";
export default class ItemRepository {
	static async getItem(item: string): Promise<IItem[]> {
		return Item.findAll({ where: { item } });
	}

	static async addItem(itemDTO: IItem): Promise<IItem> {
		return Item.create(itemDTO);
	}
}
