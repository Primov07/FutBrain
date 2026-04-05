import { getModelForClass, prop, type Ref } from "@typegoose/typegoose";
import type { User } from "./user";
import { Types } from "mongoose";

export class Player {
	@prop()
		public _id!: Types.ObjectId;

	@prop({
		required: true,
		validate: {
			validator: (v) => {
				return v.length > 0;
			},
		},
		message: "Player name cannot be empty.",
	})
	public name!: string;

	@prop({
		required: true,
		validate: {
			validator: (v) => {
				return v.length > 0;
			},
		},
		message: "Club name cannot be empty.",
	})
	public club!: string;

	@prop({
		default: "../uploads/club.png",
		validate: {
			validator: (v) => {
				return v.length > 0;
			},
		},
		message: "Club image cannot be empty.",
	})
	public clubImg!: string;

	@prop({
		default: "../uploads/player.png",
		validate: {
			validator: (v) => {
				return v.length > 0;
			},
		},
		message: "Player image cannot be empty.",
	})
	public playerImg!: string;

	@prop({
		default: [],
		ref: "User",
		type: Types.ObjectId,
	})
	public users!: Ref<User, Types.ObjectId>[];
}
const PlayerModel = getModelForClass(Player);
export default PlayerModel;
