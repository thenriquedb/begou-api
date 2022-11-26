import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { AuthenticateUserRequestDTO } from "../../dtos/AuthenticateUser";

export class AuthenticateUserController {
  async handle(
    request: Request<void, void, AuthenticateUserRequestDTO>,
    response: Response
  ) {
    const { email, password } = request.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const dto = new AuthenticateUserRequestDTO().create({
      email,
      password,
    });

    await dto.validate();

    const authenticateInfo = await authenticateUserUseCase.execute(dto);

    return response.json(authenticateInfo);
  }
}
