import express from "express";
import { connect } from "mongoose";
import dotenv from "dotenv";
import { accessoryRouter } from "./routes/accessory-routes";
import { userRouter } from "./routes/user-routes";
import { commentRouter } from "./routes/comment-routes";
import { playerRouter } from "./routes/player-routes";
import { postRouter } from "./routes/post-routes";
import { replyRouter } from "./routes/reply-routes";
import * as path from "path";

dotenv.config();

const connectionString: string = process.env.MONGO_URI!;
connect(connectionString);

export const app: express.Application = express();

app.use(express.static(path.resolve(__dirname, "../../view")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/accessories", accessoryRouter);
app.use("/users", userRouter);
app.use("/comments", commentRouter);
app.use("/players", playerRouter);
app.use("/posts", postRouter);
app.use("/replies", replyRouter);

app.get("/", (req: express.Request, res: express.Response) => {
	res.sendFile(path.resolve(__dirname, "../../view/home.html"));
});

app.get("/admin", (req: express.Request, res: express.Response) => {
	res.sendFile(path.resolve(__dirname, "../../view/admin.html"));
});

app.get("/login", (req: express.Request, res: express.Response) => {
	res.sendFile(path.resolve(__dirname, "../../view/login.html"));
});

const PORT: number = parseInt(process.env.PORT!);

app.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});
