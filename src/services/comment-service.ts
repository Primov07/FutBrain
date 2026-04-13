import { CommentRepository } from ".";
import { Comment } from ".";

export class CommentService {
	private commentRepository: CommentRepository;

	constructor() {
		this.commentRepository = new CommentRepository();
	}

	public async getAll(): Promise<Array<Comment> | null> {
		return await this.commentRepository.getAll();
	}

	public async getById(id: string): Promise<Comment | null> {
		return await this.commentRepository.getById(id);
	}

	public async create(comment: Comment) {
		await this.commentRepository.create(comment);
	}

	public async deleteById(id: string) {
		await this.commentRepository.deleteById(id);
	}

	public async update(comment: Comment) {
		await this.commentRepository.update(comment);
	}
}
