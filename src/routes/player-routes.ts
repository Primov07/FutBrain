import express from "express";
import { playerController } from ".";
import { playerUpload } from "../multerConfig";
import path from "path";
import fs from "fs";
import { playersUrl } from "../app";

export const playerRouter: express.Router = express.Router();

playerRouter.get("/", playerController.getAll.bind(playerController));
playerRouter.get("/:id", playerController.getById.bind(playerController));
playerRouter.post("/", playerUpload.single("playerImg"), playerController.create.bind(playerController));
playerRouter.delete("/:id", playerController.deleteById.bind(playerController));
playerRouter.put("/", playerUpload.single("playerImg"), playerController.update.bind(playerController));