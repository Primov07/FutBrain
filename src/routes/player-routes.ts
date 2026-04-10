import express from "express";
import { playerController } from ".";
import { playerUpload } from "../multerConfig";

export const playerRouter: express.Router = express.Router();

playerRouter.get("/", playerController.getAll.bind(playerController));
playerRouter.get("/:id", playerController.getById.bind(playerController));
playerRouter.post("/", playerUpload.single("playerImg"), playerController.create.bind(playerController), (req: express.Request, res: express.Response) => {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

		res.json({
			message: "File uploaded successfully",
		});
});
playerRouter.delete("/:id", playerController.deleteById.bind(playerController));
playerRouter.put("/", playerController.update.bind(playerController));