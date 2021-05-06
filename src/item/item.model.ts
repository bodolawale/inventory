import { Model, DataTypes, Optional } from "sequelize";
import db from "../db";

export interface IItem {
	id: number;
	quantity: number;
	expiry: number;
}

interface ItemCreationAttributes extends Optional<IItem, "id"> {}
interface ItemInstance extends Model<IItem, ItemCreationAttributes>, IItem {}

const Item = db.define<ItemInstance>(
	"item",
	{
		id: {
			primaryKey: true,
			type: DataTypes.INTEGER.UNSIGNED,
		},
		quantity: {
			type: DataTypes.NUMBER,
			allowNull: false,
		},
		expiry: {
			type: DataTypes.NUMBER,
			allowNull: false,
		},
	},
	{
		timestamps: true,
	}
);

export default Item;
