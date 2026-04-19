import express from "express";
import { accessoryController } from ".";
import { authenticateToken, restrictToAdmin } from ".";
import { accessoryUpload } from ".";

export const accessoryRouter: express.Router = express.Router();

accessoryRouter.get("/", accessoryController.getAll.bind(accessoryController));
accessoryRouter.get(
	"/:id",
	accessoryController.getById.bind(accessoryController),
);
accessoryRouter.post(
	"/",
	authenticateToken,
	restrictToAdmin,
	accessoryUpload.single("accessoryImg"),
	accessoryController.create.bind(accessoryController),
);
accessoryRouter.delete(
	"/:id",
	authenticateToken,
	restrictToAdmin,
	accessoryController.deleteById.bind(accessoryController),
);
accessoryRouter.put(
	"/",
	authenticateToken,
	restrictToAdmin,
	accessoryUpload.single("accessoryImg"),
	accessoryController.update.bind(accessoryController),
);
