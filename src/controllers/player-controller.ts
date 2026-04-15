import { NextFunction, Request, Response } from "express";
import { PlayerService } from ".";
import { VoteService } from ".";
import { CreatePlayerDTO, PlayerDTO, UpdatePlayerDTO } from "../dtos/player";
import fs from "fs";
import { AppError } from "../middlewares/error-handler";

class PlayerController {
	constructor(
		private readonly playerService: PlayerService,
		private readonly voteService: VoteService,
	) {}

	public async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const players: Array<PlayerDTO> | null =
				await this.playerService.getAll();
			if (!players) throw new AppError("Няма намерени играчи", 404);
			res.json(players);
		} catch (error) {
			next(error);
		}
	}

	public async getById(req: Request, res: Response, next: NextFunction) {
		try {
			const id: string = req.params.id!.toString();
			const player: PlayerDTO | null = await this.playerService.getById(id);
			if (!player) throw new AppError("Играчът не е намерен", 404);
			res.json(player);
		} catch (error) {
			next(error);
		}
	}

	public async create(req: Request, res: Response, next: NextFunction) {
		try {
			const playerDTO: CreatePlayerDTO = {
				name: req.body.playerName,
				club: req.body.club,
			};
			const id: string = await this.playerService.create(playerDTO);
			if (!req.file) throw new AppError("Играчът трябва да има снимка", 400);
			const oldPath: string = `uploads/players/${req.file?.filename!}`;
			const newPath: string = `uploads/players/${id}.webp`;
			fs.rename(oldPath, newPath, (err) => {
				if (err) throw new AppError("Грешка при запазване на снимката", 500);
			});
		} catch (err) {
			next(err);
		}
	}

	public async deleteById(req: Request, res: Response, next: NextFunction) {
		try {
			const id: string = req.params.id!.toString();
			const deleted: void | null = await this.playerService.deleteById(id);
			if (!deleted) throw new AppError("Играчът не е намерен", 404);
			const path: string = `uploads/players/${id}.webp`;
			fs.unlink(path, (err) => {
				throw new AppError("Грешка при изтриване на снимката", 500);
			});
		} catch (error) {
			next(error);
		}
	}

	public async update(req: Request, res: Response, next: NextFunction) {
		try {
			const player: UpdatePlayerDTO = {
				id: req.body.id,
				name: req.body.playerName,
				club: req.body.club,
			};
			const updated: void | null = await this.playerService.update(player);
			if (updated === null) throw new AppError("Играчът не е намерен", 404);
			if (req.file) {
				const path: string = `uploads/players/${player.id}.webp`;
				try {
					fs.unlinkSync(path);
				} catch (err) {}

				const oldPath: string = `uploads/players/${req.file?.filename!}`;
				fs.rename(oldPath, path, (err) => {
					if (err) console.error(err);
				});
			}
		} catch (error) {
			next(error);
		}
	}

	public vote(req: Request, res: Response, next: NextFunction) {
		try {
			this.voteService.handleVote(req.body.playerId, req.body.userId);
		} catch (err) {
			next(err);
		}
	}
}

export const playerController: PlayerController = new PlayerController(
	new PlayerService(),
	new VoteService(),
);
