import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateAnimalSizeUseCase } from "./CreateAnimalSizeUseCase";

export class CreateAnimalSizeController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body;

    const createAnimalSizeUseCase = container.resolve(CreateAnimalSizeUseCase);
    await createAnimalSizeUseCase.execute({ name, description });

    return response.status(201).send();
  }
}
