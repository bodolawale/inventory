import Item, { IItem } from "./item.model";
import { Op } from "sequelize";
export default class ItemRepository {
	static async getItem(item: string): Promise<IItem[]> {
		return Item.findAll({ where: { item, expiry: { [Op.gt]: Date.now() } } });
	}

	static async addItem(itemDTO: IItem): Promise<IItem> {
		return Item.create(itemDTO);
	}
}
