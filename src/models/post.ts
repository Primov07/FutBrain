import { getModelForClass, prop, type Ref } from "@typegoose/typegoose";
import type { User } from "./user";
import type { Comment } from "./comment";
import { Types } from "mongoose";

export class Post {
	@prop()
	public _id!: Types.ObjectId;

	@prop({
		required: true,
		validate: {
			validator: (v) => {
				return v.length >= 10;
			},
		},
		message: "Your post should be at least 10 characters long.",
	})
	public content!: string;

	@prop({ default: Date.now })
	public publishDate!: Date;

	@prop({
		default: 0,
	})
	public likeCount!: number;

	@prop({
		default: [],
		ref: "Comment",
		type: Types.ObjectId,
	})
	public comments!: Ref<Comment, Types.ObjectId>[];
	@prop({
		default: null,
		ref: "User",
		type: Types.ObjectId,
	})
	public user!: Ref<User, Types.ObjectId>;
}
const PostModel = getModelForClass(Post);
export default PostModel;
