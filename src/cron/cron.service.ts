import cron from "node-cron";
import ItemService from "../item/item.service";

export default class CronService {
	private itemService: ItemService;

	constructor(itemService: ItemService) {
		this.itemService = itemService;
	}

	async cronjob() {
		cron.schedule("* * * * *", async () => {
			await this.itemService.deleteExpiredItems();
			console.log("Deleted expired items");
		});
	}
}
