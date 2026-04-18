import express from "express";
import { userController } from ".";

export const userRouter: express.Router = express.Router();

userRouter.get("/", userController.getAll.bind(userController));
userRouter.post("/register", userController.create.bind(userController));
userRouter.delete("/", userController.deleteById.bind(userController));
userRouter.put("/profile", userController.update.bind(userController));
userRouter.post("/login", userController.authenticate.bind(userController));
userRouter.get("/:username", userController.getByUsername.bind(userController));
