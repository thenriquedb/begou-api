import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAnimalSizesUseCase } from "./ListAnimalSizesUseCase";

export class ListAnimalSizesController {
  async handle(request: Request, response: Response) {
    const listAnimalSizeUseCase = container.resolve(ListAnimalSizesUseCase);
    const animalSizes = await listAnimalSizeUseCase.execute();

    return response.status(201).json(animalSizes);
  }
}
