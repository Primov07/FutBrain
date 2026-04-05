import { Request, Response } from "express";
import { AccessoryService } from ".";
import { Accessory } from ".";

class AccessoryController {
	constructor(private readonly accessoryService: AccessoryService) {}

	public async getAll(req: Request, res: Response) {
		const accessories: Array<Accessory> | null =
			await this.accessoryService.getAll();
		res.json(accessories);
	}

	public async getById(req: Request, res: Response) {
		try {
			const id: string = req.params.id!.toString();
			const accessory: Accessory | null =
				await this.accessoryService.getById(id);
			res.json(accessory);
		} catch (error) {
			res.status(404).json({ message: (error as Error).message });
		}
	}

	public async create(req: Request, res: Response) {
		const accessory: Accessory = req.body;
		await this.accessoryService.create(accessory);
		res.status(201).json({ message: "Accessory created successfully" });
	}

	public async deleteById(req: Request, res: Response) {
		try {
			const id: string = req.params.id!.toString();
			await this.accessoryService.deleteById(id);
			res.json({ message: "Accessory deleted successfully" });
		} catch (error) {
			res.status(404).json({ message: (error as Error).message });
		}
	}

	public async update(req: Request, res: Response) {
		try {
			const accessory: Accessory = req.body;
			await this.accessoryService.update(accessory);
			res.json({ message: "Accessory updated successfully" });
		} catch (error) {
			res.status(404).json({ message: (error as Error).message });
		}
	}
}

export const accessoryController: AccessoryController = new AccessoryController(
	new AccessoryService(),
);
