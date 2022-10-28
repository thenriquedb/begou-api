import { inject, injectable } from "tsyringe";

import { IEncoder } from "@shared/ports/cryptography/IEncoder";
import { ITokenManager } from "@shared/ports/cryptography/ITokenManager";
import { BadRequestError } from "@shared/core/errors/BadRequestError";

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
    @inject("Encoder")
    encoder: IEncoder,
    @inject("TokenManager")
    tokenManager: ITokenManager
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

    const token = this.tokenManager.encrypt({}, user.id);

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
