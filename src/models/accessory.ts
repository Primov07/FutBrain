import { getModelForClass, prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { randomUUID } from "crypto";

enum Type {
	Ball = 1,
	Badge = 2,
	Shoes = 3,
}

export class Accessory {
	@prop({ default: new Types.ObjectId })
	public _id!: Types.ObjectId;

	@prop({
		required: true,
		unique: true,
	})
	public name!: string;

	@prop({ required: true })
	public photo!: string;

	@prop({
		validate: {
			validator: (v) => {
				return v > 0;
			},
			message: "Price should be positive integer!",
		},
	})
	public price!: string;

	@prop({ required: true })
	public endDate!: Date;

	@prop({ required: true, enum: Type })
	public type!: number;
}
const AccessoryModel = getModelForClass(Accessory);
export default AccessoryModel;
