import { inject, injectable } from "tsyringe";

import { BadRequestError } from "@shared/core/errors/BadRequestError";
import { ITokenManager } from "@data/ports/cryptography/ITokenManager";
import { IEncoder } from "@data/ports/cryptography/IEncoder";

import { IUsersRepository } from "../../repositories/IUserRepository";
import {
  AuthenticateUserRequestDTO,
  AuthenticateUserResponseDTO,
} from "../../dtos/AuthenticateUser";

@injectable()
class AuthenticateUserUseCase {
  private usersRepository: IUsersRepository;
  private encoder: IEncoder;
  private tokenManager: ITokenManager;

  constructor(
    @inject("UsersRepository")
    usersRepository: IUsersRepository,
    @inject("TokenManager")
    tokenManager: ITokenManager,
    @inject("Encoder")
    encoder: IEncoder
  ) {
    this.usersRepository = usersRepository;
    this.encoder = encoder;
    this.tokenManager = tokenManager;
  }

  async execute({
    email,
    password,
  }: AuthenticateUserRequestDTO): Promise<AuthenticateUserResponseDTO> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestError("Email or password incorrect");
    }

    const passwordMatch = await this.encoder.compare(password, user.password);

    if (!passwordMatch) {
      throw new BadRequestError("Email or password incorrect");
    }

    const token = this.tokenManager.encrypt(user.id);

    return {
      token,
      user: {
        email: user.email,
        name: user.name,
      },
    };
  }
}

export { AuthenticateUserUseCase };
