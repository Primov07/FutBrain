import { Request, Response } from "express";
import { ReplyService } from ".";
import { Reply } from ".";

class ReplyController {
	constructor(private readonly replyService: ReplyService) {}

	public async getAll(req: Request, res: Response) {
		const replies: Array<Reply> | null = await this.replyService.getAll();
		res.json(replies);
	}

	public async getById(req: Request, res: Response) {
		try {
			const id: string = req.params.id!.toString();
			const reply: Reply | null = await this.replyService.getById(id);
			res.json(reply);
		} catch (error) {
			res.status(404).json({ message: (error as Error).message });
		}
	}

	public async create(req: Request, res: Response) {
		const reply: Reply = req.body;
		await this.replyService.create(reply);
		res.status(201).json({ message: "Reply created successfully" });
	}

	public async deleteById(req: Request, res: Response) {
		try {
			const id: string = req.params.id!.toString();
			await this.replyService.deleteById(id);
			res.json({ message: "Reply deleted successfully" });
		} catch (error) {
			res.status(404).json({ message: (error as Error).message });
		}
	}

	public async update(req: Request, res: Response) {
		try {
			const reply: Reply = req.body;
			await this.replyService.update(reply);
			res.json({ message: "Reply updated successfully" });
		} catch (error) {
			res.status(404).json({ message: (error as Error).message });
		}
	}
}

export const replyController: ReplyController = new ReplyController(
	new ReplyService(),
);
