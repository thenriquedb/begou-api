import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateAnimalPersonalityUseCase } from "./CreateAnimalPersonalityUseCase";

export class CreateAnimalPersonalityController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body;

    const createAnimalPersonalityUseCase = container.resolve(
      CreateAnimalPersonalityUseCase
    );
    await createAnimalPersonalityUseCase.execute({ name, description });

    return response.status(201).send();
  }
}
