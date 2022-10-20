import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateAnimalUseCase } from "./CreateAnimalUseCase";

export class CreateAnimalController {
  async handle(request: Request, response: Response) {
    const {
      name,
      description,
      genre,
      size_id,
      specie_id,
      health_ids = [],
      personality_ids = [],
    } = request.body;
    const { institution_id } = request.params;

    const createAnimalUseCase = container.resolve(CreateAnimalUseCase);

    await createAnimalUseCase.execute({
      institution_id,
      name,
      description,
      genre,
      size_id,
      specie_id,
      health_ids,
      personality_ids,
    });

    return response.status(201).send();
  }
}
