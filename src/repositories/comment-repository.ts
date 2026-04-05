import { CommentModel, Comment } from ".";
import { DocumentType } from "@typegoose/typegoose";
import {Types} from "mongoose";

export default class CommentRepository {
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
		if (!comment) throw new Error("Comment does not exist.");
		return comment;
	}

	public async create(comment: Comment) {
		const model: DocumentType<Comment> = new CommentModel(comment);
		model.save();
	}

	public async deleteById(id: string) {
		const result: Comment | null = await CommentModel.findByIdAndDelete(new Types.ObjectId(id))
			.lean()
			.exec();
		if (!result) throw new Error("Comment does not exist.");
	}

	public async update(comment: Comment) {
		const id: string = comment._id.toString();
		let found = await CommentModel.findById(new Types.ObjectId(id));

		if (!found) throw new Error("Comment not found.");
		found = new CommentModel(comment);
		await found.save();
	}
}
