import { Request, Response } from "express";
import { CommentService } from ".";
import { Comment } from ".";

class CommentController {
	constructor(private readonly commentService: CommentService) {}

	public async getAll(req: Request, res: Response) {
		const comments: Array<Comment> | null = await this.commentService.getAll();
		res.json(comments);
	}

	public async getById(req: Request, res: Response) {
		try {
			const id: string = req.params.id!.toString();
			const comment: Comment | null = await this.commentService.getById(id);
			res.json(comment);
		} catch (error) {
			res.status(404).json({ message: (error as Error).message });
		}
	}

	public async create(req: Request, res: Response) {
		const comment: Comment = req.body;
		await this.commentService.create(comment);
		res.status(201).json({ message: "Comment created successfully" });
	}

	public async deleteById(req: Request, res: Response) {
		try {
			const id: string = req.params.id!.toString();
			await this.commentService.deleteById(id);
			res.json({ message: "Comment deleted successfully" });
		} catch (error) {
			res.status(404).json({ message: (error as Error).message });
		}
	}

	public async update(req: Request, res: Response) {
		try {
			const comment: Comment = req.body;
			await this.commentService.update(comment);
			res.json({ message: "Comment updated successfully" });
		} catch (error) {
			res.status(404).json({ message: (error as Error).message });
		}
	}
}

export const commentController: CommentController = new CommentController(
	new CommentService(),
);
