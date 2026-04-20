import { ReplyRepository } from "../repositories/reply-repository";
import { User, UserRepository } from "../repositories";
import { Reply } from "../models/reply";
import { ReplyDTO, CreateReplyDTO, UpdateReplyDTO } from "../dtos/reply";
import { Types } from "mongoose";
import { AppError } from "../middlewares/error-handler";

export class ReplyService {
	private replyRepository: ReplyRepository;
	private userRepository: UserRepository;
	constructor() {
		this.replyRepository = new ReplyRepository();
		this.userRepository = new UserRepository();
	}

	public async getAll(): Promise<Array<ReplyDTO> | null> {
		const replies = await this.replyRepository.getAll();
		if (replies) return replies.map((r) => this.toReplyDTO(r));
		return null;
	}

	public async getById(id: string): Promise<ReplyDTO | null> {
		const reply = await this.replyRepository.getById(id);
		if (reply) return this.toReplyDTO(reply);
		return null;
	}

	public async create(replyDTO: CreateReplyDTO): Promise<string> {
		const reply = new Reply();
		reply.content = replyDTO.content;
		reply.photos = replyDTO.photos || [];
		reply.user = replyDTO.user;
		reply.comment = new Types.ObjectId(replyDTO.comment);
		return await this.replyRepository.create(reply);
	}

	public async deleteById(id: string): Promise<boolean> {
		return await this.replyRepository.deleteById(id);
	}

	public async update(replyDTO: UpdateReplyDTO): Promise<void | null> {
		const reply = new Reply();
		reply.id = replyDTO.id;
		reply.content = replyDTO.content;
		return await this.replyRepository.update(reply);
	}

	private toReplyDTO(reply: Reply): ReplyDTO {
		return {
			id: reply.id,
			content: reply.content,
			photos: reply.photos,
			user: reply.user?.toString() || "",
			comment: reply.comment?.toString() || "",
			publishDate: reply.publishDate,
			likedBy: reply.likedBy?.map(String) || [],
		};
	}
}
