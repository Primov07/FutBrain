import { Types } from "mongoose";
import { ReplyModel, Reply } from ".";
import { DocumentType } from "@typegoose/typegoose";

export class ReplyRepository {
	public async getAll(): Promise<Array<Reply> | null> {
		const replies: Array<Reply> | null = await ReplyModel.find()
			.lean()
			.exec();
		return replies;
	}

	public async getById(id: string): Promise<Reply | null> {
		const reply: Reply | null = await ReplyModel.findById(new Types.ObjectId(id))
			.lean()
			.exec();
		return reply;
	}

	public async create(reply: Reply): Promise<string> {
		const model: DocumentType<Reply> = new ReplyModel(reply);
		await model.save();
		return model._id.toString();
	}

	public async deleteById(id: string): Promise<boolean> {
		const result: Reply | null = await ReplyModel.findByIdAndDelete(
			new Types.ObjectId(id),
		)
			.lean()
			.exec();
		if (!result) return false;
		return true;
	}

	public async update(reply: Reply): Promise<void | null> {
		const id: string = (reply as any)._id || reply.id;
		let found = await ReplyModel.findById(new Types.ObjectId(id));

		if (!found) return null;

		found.content = reply.content;
		if (reply.photos) found.photos = reply.photos;

		await found.save();
	}
}
