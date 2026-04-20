import { CommentRepository } from "../repositories/comment-repository";
import { User, UserRepository } from "../repositories";
import { Comment } from "../models/comment";
import {
	CommentDTO,
	CreateCommentDTO,
	UpdateCommentDTO,
} from "../dtos/comment";
import { Types } from "mongoose";
import { AppError } from "../middlewares/error-handler";

export class CommentService {
	private commentRepository: CommentRepository;
	private userRepository: UserRepository;

	constructor() {
		this.commentRepository = new CommentRepository();
		this.userRepository = new UserRepository();
	}

	public async getAll(): Promise<Array<CommentDTO> | null> {
		const comments = await this.commentRepository.getAll();
		if (comments) return comments.map((c) => this.toCommentDTO(c));
		return null;
	}

	public async getById(id: string): Promise<CommentDTO | null> {
		const comment = await this.commentRepository.getById(id);
		if (comment) return this.toCommentDTO(comment);
		return null;
	}

	public async create(commentDTO: CreateCommentDTO): Promise<string> {
		const comment = new Comment();
		comment.content = commentDTO.content;
		comment.photos = commentDTO.photos || [];
		comment.user = commentDTO.user;
		comment.post = new Types.ObjectId(commentDTO.post);
		return await this.commentRepository.create(comment);
	}

	public async deleteById(id: string): Promise<boolean> {
		return await this.commentRepository.deleteById(id);
	}

	public async update(commentDTO: UpdateCommentDTO): Promise<void | null> {
		const comment = new Comment();
		comment.id = commentDTO.id;
		comment.content = commentDTO.content;
		return await this.commentRepository.update(comment);
	}

	private toCommentDTO(comment: Comment): CommentDTO {
		return {
			id: comment.id,
			content: comment.content,
			photos: comment.photos,
			user: comment.user?.toString() || "",
			post: comment.post?.toString() || "",
			publishDate: comment.publishDate,
			likedBy: comment.likedBy?.map(String) || [],
		};
	}
}
