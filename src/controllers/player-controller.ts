import { Request, Response } from "express";
import { PlayerService } from ".";
import { CreatePlayerDTO, PlayerDTO, UpdatePlayerDTO } from "../dtos/player";
import fs from "fs";
import { playersUrl } from "../app";

class PlayerController {
	constructor(private readonly playerService: PlayerService) {}

	public async getAll(req: Request, res: Response) {
		const players: Array<PlayerDTO> | null = await this.playerService.getAll();
		res.json(players);
	}

	public async getById(req: Request, res: Response) {
		try {
			const id: string = req.params.id!.toString();
			const player: PlayerDTO | null = await this.playerService.getById(id);
			res.json(player);
		} catch (error) {
			res.status(404).json({ message: (error as Error).message });
		}
	}

	public async create(req: Request, res: Response) {
		try {
			const playerDTO: CreatePlayerDTO = {
				name: req.body.playerName,
				club: req.body.club,
			};
			const id: string = await this.playerService.create(playerDTO);
			if (!req.file)
				return res.status(400).json({ message: "No file uploaded" });
			const oldPath: string = `uploads/players/${req.file?.filename!}`;
			const newPath: string = `uploads/players/${id}.webp`;
			fs.rename(oldPath, newPath, (err) => {
				if (err) console.error(err);
			});

			res.status(201).json({ message: "Player created", id });
		} catch (err) {
			console.log(err);
			res.status(500).send("Проблем при запазването на снимката!");
		}
	}

	public async deleteById(req: Request, res: Response) {
		try {
			const id: string = req.params.id!.toString();
			await this.playerService.deleteById(id);
			
			const path: string = `uploads/players/${id}.webp`;
			fs.unlink(path, (err) => console.error(err));
			res.json({ message: "Player deleted successfully" });
		} catch (error) {
			res.status(404).json({ message: (error as Error).message });
		}
	}

	public async update(req: Request, res: Response) {
		try {
			const player: UpdatePlayerDTO = {
				id: req.body.id,
				name: req.body.playerName,
				club: req.body.club,
			};
			await this.playerService.update(player);
			if (req.file) {
				const path: string = `uploads/players/${player.id}.webp`;
				try {
					fs.unlinkSync(path);
				} catch (err) { }

				const oldPath: string = `uploads/players/${req.file?.filename!}`;
				fs.rename(oldPath, path, (err) => {
					if (err) console.error(err);
				});
			}

			res.json({ message: "Player updated successfully" });
		} catch (error) {
			res.status(404).json({ message: (error as Error).message });
		}
	}
}

export const playerController: PlayerController = new PlayerController(
	new PlayerService(),
);