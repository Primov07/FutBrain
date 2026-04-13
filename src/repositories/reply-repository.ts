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

	public async create(reply: Reply) {
		const model: DocumentType<Reply> = new ReplyModel(reply);
		model.save();
	}

	public async deleteById(id: string): Promise<Reply | null>{
		const result: Reply | null = await ReplyModel.findByIdAndDelete(new Types.ObjectId(id))
			.lean()
			.exec();
		return result;
	}

	public async update(reply: Reply) {
		const id: string = reply._id.toString();
		let found = await ReplyModel.findById(new Types.ObjectId(id));

		if (!found) return null;
		found = new ReplyModel(reply);
		await found.save();
	}
}
