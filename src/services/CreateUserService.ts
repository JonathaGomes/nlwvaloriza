import { getCustomRepository } from "typeorm";
import { hash } from "bcryptjs";
import { UsersRepositories } from "../repositories/UsersRepositories";

type UserRequest = {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
};

class CreateUserService {
  async execute({ name, admin = false, email, password }: UserRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);

    if (!email) {
      throw new Error("Email Incorreto");
    }

    const userAlreadyExists = await usersRepository.findOne({ email });

    if (userAlreadyExists) {
      throw new Error("User Already Exists");
    }

    const passwordHash = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      admin,
      password: passwordHash,
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };
