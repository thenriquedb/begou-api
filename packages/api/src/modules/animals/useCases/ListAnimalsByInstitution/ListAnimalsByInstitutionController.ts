import { Request, Response } from "express";
import { container } from "tsyringe";

import { IFindAnimalDTO } from "@modules/animals/dtos/IFindAnimalDTO";

import { ListAnimalsByInstitutionUseCase } from "./ListAnimalsByInstitutionUseCase";

type QueryParams = Omit<IFindAnimalDTO, "available"> & {
  available: string;
};

export class ListAnimalsByInstitutionController {
  async handle(request: Request, response: Response) {
    const { institution_id } = request.params;
    const { available, size_id, specie_id } = request.query as QueryParams;

    const listAnimalsByInstitutionUseCase = container.resolve(
      ListAnimalsByInstitutionUseCase
    );

    const availableCasted = available === "true";

    const animals = await listAnimalsByInstitutionUseCase.execute({
      institution_id,
      available: availableCasted,
      size_id,
      specie_id,
    });

    return response.status(201).json(animals);
  }
}
