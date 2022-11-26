import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateInstitutionAssociateUseCase } from "./CreateInstitutionAssociateUseCase";

export class CreateInstitutionAssociateController {
  async handle(request: Request, response: Response) {
    const { associates } = request.body;
    const { institution_id } = request.params;

    const createInstitutionUseCase = container.resolve(CreateInstitutionAssociateUseCase);

    await createInstitutionUseCase.execute({
      institution_id,
      associates,
    });

    return response.status(201).send();
  }
}
