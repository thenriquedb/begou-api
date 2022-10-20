import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAnimalsByInstitutionUseCase } from "./ListAnimalsByInstitutionUseCase";

export class ListAnimalsByInstitutionController {
  async handle(request: Request, response: Response) {
    const { institution_id } = request.params;

    const listAnimalsByInstitutionUseCase = container.resolve(
      ListAnimalsByInstitutionUseCase
    );

    const animals = await listAnimalsByInstitutionUseCase.execute({
      institution_id,
    });

    return response.status(201).json(animals);
  }
}
