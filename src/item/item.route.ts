import express from "express";
import ItemController from "./item.controller";

const router = express.Router({ mergeParams: true });

router.get("/quantity", ItemController.getItem);
router.post("/add", ItemController.addItem);
router.post("/sell", ItemController.sellItem);

export default router;
