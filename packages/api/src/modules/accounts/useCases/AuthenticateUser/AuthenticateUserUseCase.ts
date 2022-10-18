import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { IEncoder } from "@data/protocols/cryptography/IEncoder";
import { ITokenManager } from "@data/protocols/cryptography/ITokenManager";

import { IUsersRepository } from "../../repositories/IUserRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

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

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect");
    }

    const passwordMatch = await this.encoder.compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect");
    }

    const token = this.tokenManager.encrypt({}, user.id);

    return {
      user: {
        email: user.email,
        name: user.name,
      },
      token,
    };
  }
}

export { AuthenticateUserUseCase };
