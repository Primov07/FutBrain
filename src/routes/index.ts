import {
	accessoryController,
	commentController,
	playerController,
	postController,
	replyController,
	userController,
} from "../controllers";

import {
	AccessoryService,
	CommentService,
	PlayerService,
	PostService,
	ReplyService,
	UserService,
} from "../services";

import { app } from "../app";

export {
	accessoryController,
	commentController,
	playerController,
	postController,
	replyController,
	userController,
};

export {
	AccessoryService,
	CommentService,
	PlayerService,
	PostService,
	ReplyService,
	UserService,
};

export { app };

export { accessoryRouter } from "./accessory-routes";
export { commentRouter } from "./comment-routes";
export { playerRouter } from "./player-routes";
export { postRouter } from "./post-routes";
export { replyRouter } from "./reply-routes";
export { userRouter } from "./user-routes";