import { PlayerModel, Player } from ".";
import { DocumentType } from "@typegoose/typegoose";
import {Types} from "mongoose";

export default class PlayerRepository {
	public async getAll(): Promise<Array<Player> | null> {
		const players: Array<Player> | null = await PlayerModel.find()
			.lean()
			.exec();
		return players;
	}

	public async getById(id: string): Promise<Player | null> {
		const player: Player | null = await PlayerModel.findById(new Types.ObjectId(id)).lean().exec();
		if (!player) throw new Error("Player does not exist.");
		return player;
	}

	public async create(player: Player) {
		const model: DocumentType<Player> = new PlayerModel(player);
		model.save();
	}

	public async deleteById(id: string) {
		const result: Player | null = await PlayerModel.findByIdAndDelete(new Types.ObjectId(id))
			.lean()
			.exec();
		if (!result) throw new Error("Player does not exist.");
	}

	public async update(player: Player) {
		const id: string = player._id.toString();
		let found = await PlayerModel.findById(new Types.ObjectId(id));

		if (!found) throw new Error("Player not found.");
		found = new PlayerModel(player);
		await found.save();
	}
}
