import express from "express";
import { playerController } from ".";
import { playerUpload } from "../middlewares/multerConfig";

import {
	restrictToAdmin,
	authenticateToken,
} from "../middlewares/auth-middleware";

export const playerRouter: express.Router = express.Router();

playerRouter.get("/", playerController.getAll.bind(playerController));
playerRouter.get("/:id", playerController.getById.bind(playerController));
playerRouter.post(
	"/",
	authenticateToken,
	restrictToAdmin,
	playerUpload.single("playerImg"),
	playerController.create.bind(playerController),
);
playerRouter.post(
	"/vote",
	authenticateToken,
	playerController.getAll.bind(playerController),
);

playerRouter.delete("/:id", playerController.deleteById.bind(playerController));
playerRouter.put(
	"/",
	playerUpload.single("playerImg"),
	playerController.update.bind(playerController),
);
