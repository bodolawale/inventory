import { Request, Response } from "express";
import ItemService from "./item.service";
export default class ItemController {
	private itemService: ItemService;

	constructor(itemService: ItemService) {
		this.itemService = itemService;
	}

	getItem = async (req: Request, res: Response) => {
		try {
			const data = await this.itemService.getItem(req.params.item);
			return res.json({ message: "Item fetched successfully", data });
		} catch (error) {
			return res.json({
				message: "An error occurred",
				err: error.message,
			});
		}
	};

	addItem = async (req: Request, res: Response) => {
		try {
			await this.itemService.addItem(
				req.params.item,
				req.body.quantity,
				req.body.expiry
			);
			res.json({ message: "Item added successfully" });
		} catch (error) {
			return res.json({
				message: "An error occurred",
				err: error.message,
			});
		}
	};

	sellItem = async (req: Request, res: Response) => {
		try {
			res.json({ message: "Item sold successfully" });
		} catch (error) {
			return res.json({
				message: "An error occurred",
				err: error.message,
			});
		}
	};
}
