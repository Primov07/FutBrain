import { Types } from "mongoose";

export interface PostDTO {
	id: string;
	content: string;
	publishDate: Date;
	likedBy: string[];
	comments: string[];
	user: string;
}

export interface CreatePostDTO {
	content: string;
	user: string;
}

export interface UpdatePostDTO {
	id: string;
	content: string;
}
