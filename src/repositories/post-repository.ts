import { DocumentType } from "@typegoose/typegoose";
import { PostModel, Post } from ".";
import { Types } from "mongoose";

export default class PostRepository {
	public async getAll(): Promise<Array<Post> | null> {
		const posts: Array<Post> | null = await PostModel.find()
			.lean()
			.exec();
		return posts;
	}

	public async getById(id: string): Promise<Post | null> {
		const post: Post | null = await PostModel.findById(new Types.ObjectId(id))
			.lean()
			.exec();
		if (!post) throw new Error("Post does not exist.");
		return post;
	}

	public async create(post: Post) {
		const model : DocumentType<Post> = new PostModel(post);
		model.save();
	}

	public async deleteById(id: string) {
		const result: Post | null = await PostModel.findByIdAndDelete(new Types.ObjectId(id))
			.lean()
			.exec();
		if (!result) throw new Error("Post does not exist.");
	}

	public async update(post: Post) {
		const id: string = post._id.toString();
		let found = await PostModel.findById(new Types.ObjectId(id));

		if (!found) throw new Error("Post not found.");
		found = new PostModel(post);
		await found.save();
	}
}
