import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";

const app: Application = express();
dotenv.config();
app.use(cors());

import "./db";
import ItemRepository from "./item/item.repository";
import ItemService from "./item/item.service";
import CronService from "./cron/cron.service";
import ItemRoutes from "./item/item.route";

app.use(express.json());

app.use("/:item", ItemRoutes);

const PORT = process.env.PORT || 2323;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

function errorHandler(
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) {
	res.status(500).send({
		message: "An error occurred while processing this request",
		data: err.toString(),
	});
}

function error404(req: Request, res: Response, next: NextFunction) {
	res.status(404).send({
		success: false,
		message: "Invalid URL",
	});
}

app.use(errorHandler);
app.use(error404);

const itemService = new ItemService(new ItemRepository());
const cronService = new CronService(itemService);

cronService.cronjob();
