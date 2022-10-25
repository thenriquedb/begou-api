import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteAnimalUseCase } from "./DeleteAnimalUseCase";

export class DeleteAnimalController {
  async handle(request: Request, response: Response) {
    const { animal_id } = request.params;

    const deleteAnimalUseCase = container.resolve(DeleteAnimalUseCase);

    await deleteAnimalUseCase.execute({
      animal_id,
    });

    return response.status(204).send();
  }
}
