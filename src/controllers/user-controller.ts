import { Request, Response } from "express";
import { UserService } from ".";
import { UserDTO, CreateUserDTO, UpdateUserDTO } from "../../shared/user";

class UserController {
	constructor(private readonly userService: UserService) {}

	public async getAll(req: Request, res: Response) {
		const users: Array<UserDTO> | null = await this.userService.getAll();
		res.json(users);
	}

	public async getById(req: Request, res: Response) {
		try {
			const id: string = req.params.id!.toString();
			const user: UserDTO | null = await this.userService.getById(id);
			res.json(user);
		} catch (error) {
			res.status(404).json({ message: (error as Error).message });
		}
	}

	public async create(req: Request, res: Response) {
		const user: CreateUserDTO = req.body;
		await this.userService.create(user);
		res.status(201).json({ message: "User created successfully" });
	}

	public async deleteById(req: Request, res: Response) {
		try {
			const id: string = req.params.id!.toString();
			await this.userService.deleteById(id);
			res.json({ message: "User deleted successfully" });
		} catch (error) {
			res.status(404).json({ message: (error as Error).message });
		}
	}

	public async update(req: Request, res: Response) {
		try {
			const user: UpdateUserDTO = req.body;
			await this.userService.update(user);
			res.json({ message: "User updated successfully" });
		} catch (error) {
			res.status(404).json({ message: (error as Error).message });
		}
	}

	public async authenticate(req: Request, res: Response) {
		try {
			const { username, password } = req.body;
			const user: UserDTO | null = await this.userService.authenticate(
				username,
				password,
			);
			//res.json(user);
			res.redirect("/login");
		} catch (error) {
			res.status(401).json({ message: (error as Error).message });
		}
	}
	public async getByUsername(req: Request, res: Response) {
		try {
			const username: string = req.params.username!.toString();
			const user: UserDTO | null = await this.userService.getByUsername(username);
			res.json(user);
		} catch (error) {
			res.status(404).json({ message: (error as Error).message });
		}
	}
}

export const userController: UserController = new UserController(
	new UserService(),
);
