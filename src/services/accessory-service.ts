import { AccessoryRepository } from ".";
import { Accessory } from ".";

export class AccessoryService {
	private accessoryRepository: AccessoryRepository;

	constructor() {
		this.accessoryRepository = new AccessoryRepository();
	}

	public async getAll(): Promise<Array<Accessory> | null> {
		return await this.accessoryRepository.getAll();
	}

	public async getById(id: string): Promise<Accessory | null> {
		return await this.accessoryRepository.getById(id);
	}

	public async create(accessory: Accessory) {
		await this.accessoryRepository.create(accessory);
	}

	public async deleteById(id: string) {
		await this.accessoryRepository.deleteById(id);
	}

	public async update(accessory: Accessory) {
		await this.accessoryRepository.update(accessory);
	}
}
