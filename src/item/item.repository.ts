import Item, { IItem } from "./item.model";
import { Op } from "sequelize";
export default class ItemRepository {
	async getItem(item: string): Promise<IItem[]> {
		return Item.findAll({
			where: { item, expiry: { [Op.gt]: Date.now() } },
			order: [["expiry", "ASC"]],
		});
	}

	async addItem(itemDTO: IItem) {
		await Item.create(itemDTO);
	}

	async updateItemQuantity(id: number, quantity: number) {
		await Item.update({ quantity }, { where: { id } });
	}

	async deleteItem(id: number) {
		await Item.destroy({ where: { id } });
	}

	async deleteExpiredItems() {
		await Item.destroy({
			where: { expiry: { [Op.lt]: Date.now() } },
		});
	}
}
