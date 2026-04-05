import { UserModel, User } from ".";
import { DocumentType } from "@typegoose/typegoose";

export default class UserRepository {
	public async getAll(): Promise<Array<User> | null> {
		const users: Array<User> | null = await UserModel.find().lean().exec();
		return users;
	}

	public async getById(id: string): Promise<User | null> {
		const user: User | null = await UserModel.findById(id).lean().exec();
		if (!user) return null;
		return user;
	}

	public async getByUsername(username: string): Promise<User | null> {
		const user: User | null = await UserModel.findOne({ username: username })
			.lean()
			.exec();
		if (!user) return null;
		return user;
	}

	public async deleteByUsername(username: string) : Promise<User | null>{
		const result: User | null = await UserModel.findOneAndDelete({
			username: username,
		})
			.lean()
			.exec();
		if (!result) return null;
		return result;
	}

	public async authenticate(username: string, password: string): Promise<User | null> {
		const user: User | null = await UserModel.findOne({ username: username })
			.exec();
		if (!user)
			return null;

		const verify: boolean = await user.comparePasswords(password);
		if (!verify)
			return null;

		return user;
	}

	public async create(user: User) : Promise<User | null>{
		const ifExists: User | null = await UserModel.exists({
			username: user.username,
		})
			.lean()
			.exec();
		if (ifExists) return null;

		const model: DocumentType<User> = new UserModel(user);
		await model.save();
		return model;
	}

	public async deleteById(id: string) : Promise<User | null>{
		const result: User | null = await UserModel.findByIdAndDelete(id)
			.lean()
			.exec();
		if (!result) return null;
		return result;
	}

	public async update(user: User) : Promise<User | null>{
		const id: string = user._id;
		let found = await UserModel.findById(id);

		if (!found) return null;
		found = new UserModel(user);
		await found.save();
		return found;
	}
}
