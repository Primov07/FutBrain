import express from "express";
import { playerController } from ".";
import { playerUpload } from "../multerConfig";
import path from "path";
import fs from "fs";
import { playersUrl } from "../app";

export const playerRouter: express.Router = express.Router();

playerRouter.get("/", playerController.getAll.bind(playerController), (req: express.Request, res: express.Response) => {
	const playersFolder = path.resolve(__dirname, "../../src/uploads/players");
	
		fs.readdir(playersFolder, (err: Error | null, files: string[]) => {
			if (err) {
				console.error("Error reading players directory:", err.message);
				return res.status(500).json({ error: "Failed to read players directory" });
			}
	
			const playerImages: { name: string; url: string }[] = files
				.map((file) => ({
					name: path.parse(file).name,
					url: `${playersUrl}/${file}`,
				}));
			res.json(playerImages);
		});
});
playerRouter.get("/:id", playerController.getById.bind(playerController));
playerRouter.post("/", playerUpload.single("playerImg"), playerController.create.bind(playerController), (req: express.Request, res: express.Response) => {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

		res.json({
			message: "File uploaded successfully",
		});
});
playerRouter.delete("/:id", playerController.deleteById.bind(playerController));
playerRouter.put("/", playerController.update.bind(playerController));