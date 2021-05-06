import { Model, DataTypes, Optional } from "sequelize";
import db from "../db";

export interface IItem {
	id: number;
	item: string;
	quantity: number;
	expiry: number;
}

export interface ICreateItem extends Optional<IItem, "id"> {}
interface ItemInstance extends Model<IItem, ICreateItem>, IItem {}

const Item = db.define<ItemInstance>(
	"item",
	{
		id: {
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		item: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		expiry: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		timestamps: true,
	}
);

Item.sync();

export default Item;
