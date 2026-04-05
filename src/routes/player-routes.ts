import express from "express";
import { playerController } from ".";

export const playerRouter: express.Router = express.Router();

playerRouter.get("/", playerController.getAll.bind(playerController));
playerRouter.get("/:id", playerController.getById.bind(playerController));
playerRouter.post("/", playerController.create.bind(playerController));
playerRouter.delete("/:id", playerController.deleteById.bind(playerController));
playerRouter.put("/", playerController.update.bind(playerController));
