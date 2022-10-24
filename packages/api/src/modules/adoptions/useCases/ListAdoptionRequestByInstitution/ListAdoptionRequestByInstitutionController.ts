import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAdoptionRequestByInstitutionUseCase } from "./ListAdoptionRequestByInstitutionUseCase";

export class ListAdoptionRequestByInstitutionController {
  async handle(request: Request, response: Response) {
    const { institution_id } = request.params;

    const listAdoptionRequestByInstitutionUseCase = container.resolve(
      ListAdoptionRequestByInstitutionUseCase
    );

    const adoptionRequests =
      await listAdoptionRequestByInstitutionUseCase.execute({
        institution_id,
      });

    return response.status(201).json(adoptionRequests);
  }
}
