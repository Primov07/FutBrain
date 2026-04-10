import { Types } from "mongoose";

export interface PlayerDTO {
	id: Types.ObjectId;
	name: string;
	club: string;
	clubImg: string;
	playerImg: string;
	users: Types.ObjectId[];
}

export interface CreatePlayerDTO {
	name: string;
	club: string;
}
