import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetInstitutionUseCase } from "./GetInstitutionUseCase";

export class GetInstitutionController {
  async handle(request: Request, response: Response) {
    const { instituition_id } = request.params;

    const getInstitutionUseCase = container.resolve(GetInstitutionUseCase);

    const institution = await getInstitutionUseCase.execute(instituition_id);

    return response.status(201).json(institution);
  }
}
