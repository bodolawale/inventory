require("pg").defaults.parseInt8 = true;
import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../db";

export interface IItem {
	item: string;
	quantity: number;
	expiry: number;
}

interface ItemModel extends IItem, Model {}

const Item = sequelize.define<ItemModel>(
	"item",
	{
		item: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		expiry: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
	},
	{
		timestamps: true,
	}
);

Item.sync({ alter: true });

export default Item;
