import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAdoptionRequestFromInstitutionUseCase } from "./ListAdoptionRequestFromInstitutionUseCase";

export class ListAdoptionRequestFromInstitutionController {
  async handle(request: Request, response: Response) {
    const { institution_id } = request.params;

    const listAdoptionRequestFromInstitutionUseCase = container.resolve(
      ListAdoptionRequestFromInstitutionUseCase
    );

    const adoptionRequests = await listAdoptionRequestFromInstitutionUseCase.execute({
      institution_id,
    });

    return response.status(201).json(adoptionRequests);
  }
}
