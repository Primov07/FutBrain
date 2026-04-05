import { ReplyRepository } from ".";
import { Reply } from ".";

export default class ReplyService {
	private replyRepository: ReplyRepository;
	constructor() {
		this.replyRepository = new ReplyRepository();
	}

	public async getAll(): Promise<Array<Reply> | null> {
		return await this.replyRepository.getAll();
	}

	public async getById(id: string): Promise<Reply | null> {
		return await this.replyRepository.getById(id);
	}

	public async create(reply: Reply) {
		await this.replyRepository.create(reply);
	}

	public async deleteById(id: string) {
		await this.replyRepository.deleteById(id);
	}

	public async update(reply: Reply) {
		await this.replyRepository.update(reply);
	}
}
