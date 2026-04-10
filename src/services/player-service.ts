import { PlayerRepository } from ".";
import { Player } from ".";
import { CreatePlayerDTO } from "../dtos/player";

export default class PlayerService {
	private playerRepository: PlayerRepository;
	constructor() {
		this.playerRepository = new PlayerRepository();
	}

	public async getAll(): Promise<Array<Player> | null> {
		return await this.playerRepository.getAll();
	}

	public async getById(id: string): Promise<Player | null> {
		return await this.playerRepository.getById(id);
	}

	public async create(player: CreatePlayerDTO) {
		const newPlayer: Player = new Player();
		newPlayer.name = player.name;
		newPlayer.club = player.club;
		await this.playerRepository.create(newPlayer);
	}

	public async deleteById(id: string) {
		await this.playerRepository.deleteById(id);
	}

	public async update(player: Player) {
		await this.playerRepository.update(player);
	}
}
