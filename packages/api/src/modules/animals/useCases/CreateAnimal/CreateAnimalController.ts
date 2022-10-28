import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateAnimalRequestDTO } from "@modules/animals/dtos/CreateAnimal";

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
      stage_of_life_id,
    } = request.body;
    const { institution_id } = request.params;

    const createAnimalUseCase = container.resolve(CreateAnimalUseCase);

    const dto = new CreateAnimalRequestDTO().create({
      institution_id,
      name,
      description,
      genre,
      size_id,
      specie_id,
      health_ids,
      personality_ids,
      stage_of_life_id,
    });

    await dto.validate();

    await createAnimalUseCase.execute(dto);

    return response.status(201).send();
  }
}
