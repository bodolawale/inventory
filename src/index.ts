import express, { Application } from "express";
import dotenv from "dotenv";

import ItemRoutes from "./item/item.route";

const app: Application = express();

dotenv.config();

import "./db";

app.use("/:item", ItemRoutes);

const PORT = process.env.PORT || 2323;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
