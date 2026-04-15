import jwt from "jsonwebtoken";
import express from "express";
import { AppError } from "./error-handler";

const SECRET_KEY: string = process.env.SECRET_KEY?.toString()!;

interface JwtPayload {
	id: string;
	username: string;
	isAdmin: boolean;
}

export const authenticateToken = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
) => {
	try {
		const token = req.cookies.token;

		if (!token)
			return next(
				new AppError("Моля, влезте в профила си, за да получите достъп.", 401),
			);

		const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
		(req as any).user = decoded;
		next();
	} catch (err) {
		return next(
			new AppError("Невалиден или изтекъл токен. Моля, влезте отново.", 401),
		);
	}
};

export const restrictToAdmin = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
) => {
	const user = (req as any).user;
	if (!user || !user.isAdmin)
		return next(new AppError("Нямате право на това действие.", 403));

	next();
};
