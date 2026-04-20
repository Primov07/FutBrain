import express from "express";
import { commentController } from "../controllers";

export const commentRouter: express.Router = express.Router();

commentRouter.get("/", commentController.getAll.bind(commentController));
commentRouter.get("/:id", commentController.getById.bind(commentController));
commentRouter.post("/", commentController.create.bind(commentController));
commentRouter.delete(
	"/:id",
	commentController.deleteById.bind(commentController),
);
commentRouter.put("/", commentController.update.bind(commentController));
