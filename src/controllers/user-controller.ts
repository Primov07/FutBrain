import { NextFunction, Request, Response } from "express";
import { UserService } from ".";
import { UserDTO, CreateUserDTO, UpdateUserDTO } from "../dtos/user";
import { AppError } from "../middlewares/error-handler";
import jwt from "jsonwebtoken";

class UserController {
	constructor(private readonly userService: UserService) {}

	public async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const users: Array<UserDTO> | null = await this.userService.getAll();
			if (!users) throw new AppError("Няма налични потребители", 404);
			res.json(users);
		} catch (error) {
			next(error);
		}
	}

	public async getById(req: Request, res: Response, next: NextFunction) {
		try {
			const id: string = req.params.id!.toString();
			const user: UserDTO | null = await this.userService.getById(id);
			res.json(user);
		} catch (error) {
			next(error);
		}
	}

	public async create(req: Request, res: Response) {
		const user: CreateUserDTO = req.body;
		await this.userService.create(user);
		res.status(201).json({ message: "User created successfully" });
	}

	public async deleteById(req: Request, res: Response, next: NextFunction) {
		try {
			const id: string = req.params.id!.toString();
			await this.userService.deleteById(id);
			res.json({ message: "User deleted successfully" });
		} catch (error) {
			next(error);
		}
	}

	public async update(req: Request, res: Response, next: NextFunction) {
		try {
			const user: UpdateUserDTO = req.body;
			await this.userService.update(user);
			res.json({ message: "User updated successfully" });
		} catch (error) {
			next(error);
		}
	}

	public async authenticate(req: Request, res: Response, next: NextFunction) {
		try {
			const { username, password } = req.body;
			const user: UserDTO | null = await this.userService.authenticate(
				username,
				password,
			);

			if (!user)
				throw new AppError("Грешно потребителско име или парола!", 401);

			const token = jwt.sign(
				{
					id: user.id,
					username: user.username,
					isAdmin: user.isAdmin,
				},
				process.env.SECRET_KEY!.toString(),
				{ expiresIn: "24h" },
			);

			res.status(200).json({
				message: "Успешен вход!",
				token: token,
				user: {
					id: user.id,
					username: user.username,
					isAdmin: user.isAdmin,
					pictureURL: user.pictureURL,
				},
			});
		} catch (error) {
			next(error);
		}
	}
	public async getByUsername(req: Request, res: Response, next: NextFunction) {
		try {
			const username: string = req.params.username!.toString();
			const user: UserDTO | null =
				await this.userService.getByUsername(username);
			res.json(user);
		} catch (error) {
			next(error);
		}
	}
}

export const userController: UserController = new UserController(
	new UserService(),
);
