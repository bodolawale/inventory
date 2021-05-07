import express from "express";
import ItemRepository from "./item.repository";
import ItemService from "./item.service";
import ItemController from "./item.controller";
import validateRequest from "./item.middleware";
import isValidRequest from "../middlewares/isValidRequest";

const itemService = new ItemService(new ItemRepository());
const itemController = new ItemController(itemService);

const router = express.Router({ mergeParams: true });

router.get("/quantity", itemController.getItem);

router.post(
	"/add",
	validateRequest("add"),
	isValidRequest,
	itemController.addItem
);

router.post(
	"/sell",
	validateRequest("sell"),
	isValidRequest,
	itemController.sellItem
);

export default router;
