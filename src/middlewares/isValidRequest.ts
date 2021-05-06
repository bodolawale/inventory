import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

const isValidRequest = (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({
			success: false,
			message: "Your request has some validation errors",
			data: errors.array(),
		});
	}

	return next();
};

export default isValidRequest;
