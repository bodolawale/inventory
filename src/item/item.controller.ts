import { Request, Response } from "express";
import ItemService from "./item.service";
export default class ItemController {
	private itemService: ItemService;

	constructor(itemService: ItemService) {
		this.itemService = itemService;
	}

	getItem = async (req: Request, res: Response) => {
		const data = await this.itemService.getItem(req.params.item);
		res.json({ message: "Item fetched successfully", data });
	};

	addItem = async (req: Request, res: Response) => {
		await this.itemService.addItem(
			req.params.item,
			req.body.quantity,
			req.body.expiry
		);
		res.json({ message: "Item added successfully" });
	};

	sellItem = async (req: Request, res: Response) => {
		res.json({ message: "Item sold successfully" });
	};
}
