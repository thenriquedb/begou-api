import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAnimalHealthUseCase } from "./ListAnimalHealthUseCase";

export class ListAnimalHealthController {
  async handle(request: Request, response: Response) {
    const listAnimalHealthsUseCase = container.resolve(ListAnimalHealthUseCase);

    const animalHealths = await listAnimalHealthsUseCase.execute();

    return response.status(201).json(animalHealths);
  }
}
