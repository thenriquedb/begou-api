import { inject, injectable } from "tsyringe";

import { IEncoder } from "@data/protocols/cryptography/IEncoder";
import { ConflictError } from "@shared/core/errors/ConflictError";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUserRepository";

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

  async execute(data: ICreateUserDTO) {
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
