import { Request, Response } from "express";
import { PlayerService } from ".";
import { Player } from ".";
import { CreatePlayerDTO } from "../dtos/player";

class PlayerController {
	constructor(private readonly playerService: PlayerService) {}

	public async getAll(req: Request, res: Response) {
		const players: Array<Player> | null = await this.playerService.getAll();
		res.json(players);
	}

	public async getById(req: Request, res: Response) {
		try {
			const id: string = req.params.id!.toString();
			const player: Player | null = await this.playerService.getById(id);
			res.json(player);
		} catch (error) {
			res.status(404).json({ message: (error as Error).message });
		}
	}

	public async create(req: Request, res: Response) {
		const playerDTO: CreatePlayerDTO = {name: req.body.playerName, club: req.body.club};
		await this.playerService.create(playerDTO);
		res.status(201).json({ message: "Player created successfully" });
	}

	public async deleteById(req: Request, res: Response) {
		try {
			const id: string = req.params.id!.toString();
			await this.playerService.deleteById(id);
			res.json({ message: "Player deleted successfully" });
		} catch (error) {
			res.status(404).json({ message: (error as Error).message });
		}
	}

	public async update(req: Request, res: Response) {
		try {
			const player = req.body.playerImg;
			await this.playerService.update(player);
			res.json({ message: "Player updated successfully" });
		} catch (error) {
			res.status(404).json({ message: (error as Error).message });
		}
	}
}

export const playerController: PlayerController = new PlayerController(
	new PlayerService(),
);
