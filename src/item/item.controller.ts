import { Request, Response } from "express";
export default class ItemController {
	static async getItem(req: Request, res: Response) {
		res.json({ message: "Item fetched successfully" });
	}
	static async addItem(req: Request, res: Response) {
		res.json({ message: "Item added successfully" });
	}
	static async sellItem(req: Request, res: Response) {
		res.json({ message: "Item sold successfully" });
	}
}
