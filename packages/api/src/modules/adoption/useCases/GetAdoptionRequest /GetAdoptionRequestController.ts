import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetAdoptionRequestUseCase } from "./GetAdoptionRequestUseCase";

export class GetAdoptionRequestController {
  async handle(request: Request, response: Response) {
    const { adoption_id } = request.params;

    const getAdoptionRequestUseCase = container.resolve(GetAdoptionRequestUseCase);

    const adoptionRequest = await getAdoptionRequestUseCase.execute({
      adoption_id,
    });

    return response.status(201).json(adoptionRequest);
  }
}
