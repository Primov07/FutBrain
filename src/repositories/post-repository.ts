import { DocumentType } from "@typegoose/typegoose";
import { PostModel, Post } from ".";
import { Types } from "mongoose";

export class PostRepository {
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
		return post;
	}

	public async create(post: Post) {
		const model : DocumentType<Post> = new PostModel(post);
		model.save();
	}

	public async deleteById(id: string) : Promise<Post | null>{
		const result: Post | null = await PostModel.findByIdAndDelete(new Types.ObjectId(id))
			.lean()
			.exec();
		return result;
	}

	public async update(post: Post) : Promise<void | null>{
		const id: string = post._id.toString();
		let found = await PostModel.findById(new Types.ObjectId(id));

		if (!found) return null;
		found = new PostModel(post);
		await found.save();
	}
}
