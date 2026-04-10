import multer from "multer";
import path from "path";

const playerStorage: multer.StorageEngine = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "../src/uploads/players");
	},
    filename: (req, file, cb) => {
        const extName = path.extname(file.originalname);
		const name = req.body.playerName;
		cb(null, name + extName);
	},
});

export const playerUpload: multer.Multer = multer({
	storage: playerStorage,
	limits: {
		fileSize: 1 * 1024 * 1024, // 1 MB
	},
});

const commentStorage: multer.StorageEngine = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "../uploads/comments");
	},
	filename: (req, file, cb) => {
		const id = req.body.id;
		cb(null, id);
	},
});
