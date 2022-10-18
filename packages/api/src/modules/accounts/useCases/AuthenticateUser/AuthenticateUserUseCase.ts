import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { IEncoder } from "@data/protocols/cryptography/IEncoder";
import { IEmailValidator } from "@validators/protocols/IEmailValidator";
import { BadRequestError } from "@shared/errors/BadRequestError";

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
  private emailValidator: IEmailValidator;

  constructor(
    @inject("UsersRepository")
    usersRepository: IUsersRepository,
    @inject("Encoder")
    encoder: IEncoder,
    @inject("EmailValidator")
    emailValidator: IEmailValidator
  ) {
    this.usersRepository = usersRepository;
    this.encoder = encoder;
    this.emailValidator = emailValidator;
  }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const emailIsValid = this.emailValidator.validate(email);

    if (!emailIsValid) {
      throw new BadRequestError("Email is invalid");
    }

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect");
    }

    const passwordMatch = await this.encoder.compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect");
    }

    const token = sign({}, process.env.JWT_SECRET, {
      subject: user.id,
      expiresIn: "1d",
    });

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
