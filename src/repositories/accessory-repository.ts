import { AccessoryModel , Accessory } from ".";
import { DocumentType } from "@typegoose/typegoose";
import {Types} from "mongoose";

export class AccessoryRepository {
	public async getAll(): Promise<Array<Accessory> | null> {
		const accessories: Array<Accessory> | null = await AccessoryModel.find()
			.lean()
			.exec();
		return accessories;
	}

	public async getById(id: string): Promise<Accessory | null> {
		const accessory: Accessory | null = await AccessoryModel.findById(new Types.ObjectId(id))
			.lean()
			.exec();
		return accessory;
	}

	public async create(accessory: Accessory) {
		const model: DocumentType<Accessory> = new AccessoryModel(accessory);
		model.save();
	}

	public async deleteById(id: string) : Promise<Accessory | null>{
		const result: Accessory | null = await AccessoryModel.findByIdAndDelete(new Types.ObjectId(id))
			.lean()
			.exec();
		return result;
	}

	public async update(accessory: Accessory) : Promise<void | null>{
		const id: string = accessory._id.toString();
		let found = await AccessoryModel.findById(new Types.ObjectId(id));

		if (!found) return null;
		found = new AccessoryModel(accessory);
		await found.save();
	}
}
