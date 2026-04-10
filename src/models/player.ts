import { getModelForClass, prop, type Ref, pre } from "@typegoose/typegoose";
import type { User } from "./user";
import { Types } from "mongoose";

@pre<Player>("save", async function () {
	if (this.isModified("club")) {
		this.clubImg = `/clubs/${this.club}.png`;
		this.id = this._id.toString();
	}
})
export class Player {
	/*@prop({
		default: new Types.ObjectId,
	})
	public _id!: Types.ObjectId; */

	@prop({})
	public id!: string;

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
		default: "../../uploads/club.png",
	})
	public clubImg!: string;

	@prop({
		default: "/players/player.png",
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
