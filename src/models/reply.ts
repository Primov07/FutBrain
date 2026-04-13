import { getModelForClass, prop, type Ref } from "@typegoose/typegoose";
import type { User } from "./user";
import type { Comment } from "./comment";

import { Types } from "mongoose";

export class Reply {
	@prop()
	public _id!: Types.ObjectId;

	@prop({
		required: true,
		validate: {
			validator: (v) => {
				return v.length >= 10;
			},
		},
		message: "Your reply should be at least 10 characters long.",
	})
	public content!: string;

	@prop({ default: [] })
	public photos!: string[];

	@prop({
		ref: "User",
		type: Types.ObjectId,
	})
	public user!: Ref<User, Types.ObjectId>;

	@prop({
		ref: "Comment",
		type: Types.ObjectId,
	})
	public comment!: Ref<Comment, Types.ObjectId>;

	@prop({ required: true, default: Date.now })
	public publishDate!: Date;

	@prop({
		default: [],
		ref: "User",
		type: String,
	})
	public likedBy?: Ref<User, string>[];
}

export const ReplyModel = getModelForClass(Reply);
