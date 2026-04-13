import { PostRepository } from ".";
import { Post } from ".";

export class PostService {
	private postRepository: PostRepository;
	constructor() {
		this.postRepository = new PostRepository();
	}

	public async getAll(): Promise<Array<Post> | null> {
		return await this.postRepository.getAll();
	}

	public async getById(id: string): Promise<Post | null> {
		return await this.postRepository.getById(id);
	}

	public async create(post: Post) {
		await this.postRepository.create(post);
	}

	public async deleteById(id: string) {
		await this.postRepository.deleteById(id);
	}

	public async update(post: Post) {
		await this.postRepository.update(post);
	}
}
