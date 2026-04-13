import { CommentModel, Comment } from ".";
import { DocumentType } from "@typegoose/typegoose";
import {Types} from "mongoose";

export class CommentRepository {
	public async getAll(): Promise<Array<Comment> | null> {
		const comments: Array<Comment> | null = await CommentModel.find()
			.lean()
			.exec();
		return comments;
	}

	public async getById(id: string): Promise<Comment | null> {
		const comment: Comment | null = await CommentModel.findById(new Types.ObjectId(id))
			.lean()
			.exec();
		return comment;
	}

	public async create(comment: Comment) {
		const model: DocumentType<Comment> = new CommentModel(comment);
		model.save();
	}

	public async deleteById(id: string) : Promise<Comment | null>{
		const result: Comment | null = await CommentModel.findByIdAndDelete(new Types.ObjectId(id))
			.lean()
			.exec();
		return result;
	}

	public async update(comment: Comment) : Promise<void | null>{
		const id: string = comment._id.toString();
		let found = await CommentModel.findById(new Types.ObjectId(id));

		if (!found) return null;
		found = new CommentModel(comment);
		await found.save();
	}
}
