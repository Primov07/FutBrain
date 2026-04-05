import { getModelForClass, prop, type Ref } from "@typegoose/typegoose";
import type { Post } from "./post";
import type { User } from "./user";
import { randomUUID } from "crypto";
import { Types } from "mongoose";

export class Comment {
	@prop()
	public _id!: Types.ObjectId;

	@prop({
		validate: {
			validator: (v) => {
				return v.length >= 10;
			},
		},
		message: "Your comment should be at least 10 characters long.",
	})
	public content!: string;

	@prop({ default: [] })
	public photos!: string[];

	@prop({
		required: true,
		ref: "User",
		type: Types.ObjectId,
	})
	public user!: Ref<User, Types.ObjectId>;

	@prop({
		required: true,
		ref: "Post",
		type: Types.ObjectId,
	})
	public post!: Ref<Post, Types.ObjectId>;

	@prop({ default: Date.now })
	public publishDate!: Date;

	@prop({
		default: 0,
		validate: {
			validator: (v) => {
				return v > 0;
			},
		},
		message: "Likes should be positive integer!",
	})
	public likeCount!: number;
}
const CommentModel = getModelForClass(Comment);
export default CommentModel;
