import express from "express";
import { validationResult } from "express-validator";
import ItemRepository from "./item.repository";
import ItemService from "./item.service";
import ItemController from "./item.controller";
import validateRequest from "./item.middleware";

const itemService = new ItemService(ItemRepository);
const itemController = new ItemController(itemService);

const router = express.Router({ mergeParams: true });

router.get("/quantity", itemController.getItem);

router.post(
	"/add",
	validateRequest("add"),
	validationResult,
	itemController.addItem
);

router.post(
	"/sell",
	validateRequest("sell"),
	validationResult,
	itemController.sellItem
);

export default router;
