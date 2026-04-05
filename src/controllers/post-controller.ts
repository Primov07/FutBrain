import { Request, Response } from "express";
import { PostService } from ".";
import { Post } from ".";

class PostController {
	constructor(private postService: PostService) {}

	public async getAll(req: Request, res: Response) {
		const posts: Array<Post> | null = await this.postService.getAll();
		res.json(posts);
	}

	public async getById(req: Request, res: Response) {
		try {
			const id: string = req.params.id!.toString();
			const post: Post | null = await this.postService.getById(id);
			res.json(post);
		} catch (error) {
			res.status(404).json({ message: (error as Error).message });
		}
	}

	public async create(req: Request, res: Response) {
		const post: Post = req.body;
		await this.postService.create(post);
		res.status(201).json({ message: "Post created successfully" });
	}

	public async deleteById(req: Request, res: Response) {
		try {
			const id: string = req.params.id!.toString();
			await this.postService.deleteById(id);
			res.json({ message: "Post deleted successfully" });
		} catch (error) {
			res.status(404).json({ message: (error as Error).message });
		}
	}

	public async update(req: Request, res: Response) {
		try {
			const post: Post = req.body;
			await this.postService.update(post);
			res.json({ message: "Post updated successfully" });
		} catch (error) {
			res.status(404).json({ message: (error as Error).message });
		}
	}
}

export const postController: PostController = new PostController(
	new PostService(),
);
