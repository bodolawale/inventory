import Item, { IItem, ICreateItem } from "./item.model";
export default class ItemRepository {
	static async getItem(item: string): Promise<IItem[]> {
		return Item.findAll({ where: { item } });
	}

	static async addItem(itemDTO: ICreateItem): Promise<IItem> {
		return Item.create(itemDTO);
	}
}
