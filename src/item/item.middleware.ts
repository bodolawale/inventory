import { body } from "express-validator";

const validateRequest = (method: string) => {
	switch (method) {
		case "get":
			return [];

		case "add":
			return [
				body("quantity")
					.exists()
					.withMessage("Required body param 'quantity' not provided")
					.bail()
					.custom((value) => typeof value === "number")
					.withMessage("'quantity' should be a number")
					.bail()
					.custom((value) => value > 0)
					.withMessage("'quantity' should be greater than 0"),

				body("expiry")
					.exists()
					.withMessage("Required body param 'expiry' not provided")
					.bail()
					.custom((value) => typeof value === "number")
					.withMessage("'expiry' should be a number"),
			];

		case "sell":
			return [
				body("quantity")
					.exists()
					.withMessage("Required body param 'quantity' not provided")
					.bail()
					.custom((value) => typeof value === "number")
					.withMessage("'quantity' should be a number")
					.bail()
					.custom((value) => value > 0)
					.withMessage("'quantity' should be greater than 0"),
			];

		default:
			throw new Error("invalid validator");
	}
};

export default validateRequest;
