import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetAnimalUseCase } from "./GetAnimalUseCase";

export class GetAnimalController {
  async handle(request: Request, response: Response) {
    const { animal_id } = request.params;

    const getAnimalUseCase = container.resolve(GetAnimalUseCase);

    const animal = await getAnimalUseCase.execute({ animal_id });

    return response.status(201).json(animal);
  }
}
