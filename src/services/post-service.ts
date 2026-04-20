import { PostRepository } from "../repositories/post-repository";
import { User, UserRepository } from "../repositories";
import { Post } from "../models/post";
import { PostDTO, CreatePostDTO, UpdatePostDTO } from "../dtos/post";
import { AppError } from "../middlewares/error-handler";
import { Types } from "mongoose";

export class PostService {
	private postRepository: PostRepository;
	private userRepository: UserRepository;
	constructor() {
		this.postRepository = new PostRepository();
		this.userRepository = new UserRepository();
	}

	public async getAll(): Promise<Array<PostDTO> | null> {
		const posts = await this.postRepository.getAll();
		if (posts) return posts.map((p) => this.toPostDTO(p));
		return null;
	}

	public async getById(id: string): Promise<PostDTO | null> {
		const post = await this.postRepository.getById(id);
		if (post) return this.toPostDTO(post);
		return null;
	}

	public async create(postDTO: CreatePostDTO): Promise<string> {
		const post = new Post();
		post.content = postDTO.content;
		post.user = postDTO.user;
		return await this.postRepository.create(post);
	}

	public async deleteById(id: string): Promise<boolean> {
		return await this.postRepository.deleteById(id);
	}

	public async update(postDTO: UpdatePostDTO): Promise<void | null> {
		const post = new Post();
		post.id = postDTO.id;
		post.content = postDTO.content;
		return await this.postRepository.update(post);
	}

	private toPostDTO(post: Post): PostDTO {
		return {
			id: post.id,
			content: post.content,
			publishDate: post.publishDate,
			likedBy: post.likedBy?.map(String) || [],
			comments: post.comments?.map(String) || [],
			user: post.user?.toString() || "",
		};
	}
}
