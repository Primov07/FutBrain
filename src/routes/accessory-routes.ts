import express from "express";
import { accessoryController } from ".";

export const accessoryRouter: express.Router = express.Router();

accessoryRouter.get("/", accessoryController.getAll.bind(accessoryController));
accessoryRouter.get(
	"/:id",
	accessoryController.getById.bind(accessoryController),
);
accessoryRouter.post("/", accessoryController.create.bind(accessoryController));
accessoryRouter.delete(
	"/:id",
	accessoryController.deleteById.bind(accessoryController),
);
accessoryRouter.put("/", accessoryController.update.bind(accessoryController));
