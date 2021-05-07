import express, { Application } from "express";
import dotenv from "dotenv";

const app: Application = express();
dotenv.config();

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

function errorHandler(err: any, req: any, res: any, next: any) {
	res.status(500).send({
		success: false,
		message: "An error occurred while processing this request",
		data: err.toString(),
	});
}

app.use(errorHandler);

const itemService = new ItemService(new ItemRepository());
const cronService = new CronService(itemService);

cronService.cronjob();
