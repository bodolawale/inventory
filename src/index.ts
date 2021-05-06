import express, { Application } from "express";
import dotenv from "dotenv";

const app: Application = express();
dotenv.config();

import "./db";
import ItemRoutes from "./item/item.route";

app.use(express.json());

app.use("/:item", ItemRoutes);

const PORT = process.env.PORT || 2323;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
