import { inject, injectable } from "tsyringe";

import { BadRequestError } from "@shared/errors/BadRequestError";
import { IEmailValidator } from "@validators/protocols/IEmailValidator";
import { IEncoder } from "@data/protocols/cryptography/IEncoder";
import { ConflictError } from "@shared/errors/ConflictError";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUserRepository";

@injectable()
class CreateUserUseCase {
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

  async execute(data: ICreateUserDTO) {
    const { email, name, password, phone_number } = data;

    const emailIsValid = this.emailValidator.validate(email);

    if (!emailIsValid) {
      throw new BadRequestError("Email is invalid");
    }

    const user = await this.usersRepository.findByEmail(email);
    if (user) {
      throw new ConflictError("User already exits");
    }

    const passwordHash = await this.encoder.encode(password, 8);

    this.usersRepository.create({
      email,
      name,
      password: passwordHash,
      phone_number,
    });
  }
}

export { CreateUserUseCase };
