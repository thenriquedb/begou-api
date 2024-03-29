import { inject, injectable } from "tsyringe";

import { ConflictError } from "@shared/core/errors/ConflictError";
import { IEncoder } from "@data/ports/cryptography/IEncoder";

import { CreateUserRequestDto } from "../../dtos/CreateUser";
import { IUsersRepository } from "../../repositories/IUserRepository";

type IRequest = Pick<
  CreateUserRequestDto,
  "email" | "name" | "password" | "phone_number"
>;

@injectable()
class CreateUserUseCase {
  private usersRepository: IUsersRepository;
  private encoder: IEncoder;

  constructor(
    @inject("UsersRepository")
    usersRepository: IUsersRepository,
    @inject("Encoder")
    encoder: IEncoder
  ) {
    this.usersRepository = usersRepository;
    this.encoder = encoder;
  }

  async execute(data: IRequest) {
    const { email, name, password, phone_number } = data;

    const user = await this.usersRepository.findByEmail(email);
    if (user) {
      throw new ConflictError("User already exits");
    }

    const passwordHash = await this.encoder.encode(password, 8);

    await this.usersRepository.create({
      email,
      name,
      password: passwordHash,
      phone_number,
    });
  }
}

export { CreateUserUseCase };
