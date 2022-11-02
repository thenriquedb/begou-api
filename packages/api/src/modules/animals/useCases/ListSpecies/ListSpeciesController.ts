import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListSpeciesUseCase } from "./ListSpeciesUseCase";

export class ListSpeciesController {
  async handle(request: Request, response: Response) {
    const listSpeciesUseCase = container.resolve(ListSpeciesUseCase);

    const species = await listSpeciesUseCase.execute();

    return response.status(201).json(species);
  }
}
