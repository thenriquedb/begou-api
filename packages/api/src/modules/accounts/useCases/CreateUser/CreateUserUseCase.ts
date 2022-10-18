import { inject, injectable } from "tsyringe";

import { BadRequestError } from "@shared/errors/BadRequestError";
import { IEncoder } from "@data/protocols/cryptography/IEncoder";

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
    const { email, name, password, roleId, phoneNumber } = data;

    const user = await this.usersRepository.findByEmail(email);
    if (user) {
      throw new BadRequestError("User already exits");
    }

    const passwordHash = await this.encoder.encode(password, 8);

    this.usersRepository.create({
      email,
      name,
      password: passwordHash,
      roleId,
      phoneNumber,
    });
  }
}

export { CreateUserUseCase };
