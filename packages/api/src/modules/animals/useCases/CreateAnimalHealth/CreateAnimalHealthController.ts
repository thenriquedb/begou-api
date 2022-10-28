import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateAnimalHealthUseCase } from "./CreateAnimalHealthUseCase";

export class CreateAnimalHealthController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body;

    const createAnimalHealthUseCase = container.resolve(CreateAnimalHealthUseCase);

    await createAnimalHealthUseCase.execute({ name, description });

    return response.status(201).send();
  }
}
