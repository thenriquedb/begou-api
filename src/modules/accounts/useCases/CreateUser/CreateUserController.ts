import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserRequestDto } from "../../dtos/CreateUser";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request<void, void, CreateUserRequestDto>, response: Response) {
    const { email, name, password, phone_number } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const dto = new CreateUserRequestDto().create({
      email,
      name,
      password,
      phone_number,
    });

    await dto.validate();

    await createUserUseCase.execute({
      email,
      name,
      password,
      phone_number,
    });

    return response.status(201).send();
  }
}

export { CreateUserController };
