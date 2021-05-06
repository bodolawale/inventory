import Item, { IItem } from "./item.model";
import { Op } from "sequelize";
export default class ItemRepository {
	static async getItem(item: string): Promise<IItem[]> {
		return Item.findAll({
			where: { item, expiry: { [Op.gt]: Date.now() } },
			order: [["expiry", "ASC"]],
		});
	}

	static async addItem(itemDTO: IItem): Promise<IItem> {
		return Item.create(itemDTO);
	}

	static async updateItemQuantity(id: number, quantity: number): Promise<void> {
		await Item.update({ quantity }, { where: { id } });
	}

	static async deleteItem(id: number): Promise<void> {
		await Item.destroy({ where: { id } });
	}

	static async deleteExpiredItems() {
		await Item.destroy({
			where: { expiry: { [Op.lt]: Date.now() } },
		});
	}
}
