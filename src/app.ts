import express from "express";
import { connect } from "mongoose";
import dotenv from "dotenv";
import { accessoryRouter } from "./routes/accessory-routes";
import { userRouter } from "./routes/user-routes";
import { commentRouter } from "./routes/comment-routes";
import { playerRouter } from "./routes/player-routes";
import { postRouter } from "./routes/post-routes";
import { replyRouter } from "./routes/reply-routes";
import path from "path";
import fs from "fs";
import cors from "cors";
import { playerUpload } from "./multerConfig";

dotenv.config();

const connectionString: string = process.env.MONGO_URI!;
connect(connectionString);

export const app: express.Application = express();

const PORT: number = parseInt(process.env.PORT!);
const BASE_URL: string = `http://localhost:${PORT}`;
const clubsUrl = `${BASE_URL}/clubs`;

app.use(cors({
	origin: "http://localhost:5173",
	credentials: true
}));

app.use(express.static(path.resolve(__dirname, "../../view")));
app.use("/clubs", express.static(path.join(__dirname, "../uploads/clubs")));

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
	res.sendFile(path.resolve(__dirname, "../../view/admin/admin.html"));
});

app.get("/login", (req: express.Request, res: express.Response) => {
	res.sendFile(path.resolve(__dirname, "../../view/login.html"));
});

app.get("/clubs", (req: express.Request, res: express.Response) => {
	const clubsFolder = path.resolve(__dirname, "../../src/uploads/clubs");

	fs.readdir(clubsFolder, (err: Error | null, files: string[]) => {
		if (err) {
			console.error("Error reading clubs directory:", err.message);
			return res.status(500).json({ error: "Failed to read clubs directory" });
		}

		const clubImages: { name: string; url: string }[] = files
			.filter(
				(file) =>
					file.toLowerCase().endsWith(".png") ||
					file.toLowerCase().endsWith(".jpg") ||
					file.toLowerCase().endsWith(".jpeg"),
			)
			.map((file) => ({
				name: path.parse(file).name,
				url: `${clubsUrl}/${file}`,
			}));
		res.json(clubImages);
	});
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}!`);
});
