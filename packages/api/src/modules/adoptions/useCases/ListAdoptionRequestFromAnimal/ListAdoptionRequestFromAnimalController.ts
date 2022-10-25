import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAdoptionRequestFromAnimalUseCase } from "./ListAdoptionRequestFromAnimalUseCase";

export class ListAdoptionRequestFromAnimalController {
  async handle(request: Request, response: Response) {
    const { animal_id } = request.params;

    const listAdoptionRequestFromAnimalUseCase = container.resolve(
      ListAdoptionRequestFromAnimalUseCase
    );

    const adoptionRequests = await listAdoptionRequestFromAnimalUseCase.execute({
      animal_id,
    });

    return response.status(201).json(adoptionRequests);
  }
}
