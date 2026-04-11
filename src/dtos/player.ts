import { StringLengthExpectedError } from "@typegoose/typegoose/lib/internal/errors";
import { Types } from "mongoose";

export interface PlayerDTO {
	id: string;
	name: string;
	club: string;
	clubImg: string;
	playerImg: string;
	users: string[];
}

export interface CreatePlayerDTO {
	name: string;
	club: string;
}

export interface UpdatePlayerDTO{
	id: string;
	name: string;
	club: string;
}
