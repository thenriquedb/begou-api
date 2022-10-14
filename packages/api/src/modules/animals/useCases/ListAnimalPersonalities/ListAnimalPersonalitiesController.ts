import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAnimalPersonalitiesUseCase } from "./ListAnimalPersonalitiesUseCase";

export class ListAnimalPersonalitiesController {
  async handle(request: Request, response: Response) {
    const listAnimalPersonalitiesUseCase = container.resolve(
      ListAnimalPersonalitiesUseCase
    );

    const animalPersonalitis = await listAnimalPersonalitiesUseCase.execute();

    return response.status(201).json(animalPersonalitis);
  }
}
