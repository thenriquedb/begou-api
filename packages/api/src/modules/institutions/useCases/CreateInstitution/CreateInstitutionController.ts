import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateInstitutionUseCase } from "./CreateInstitutionUseCase";

export class CreateInstitutionController {
  async handle(request: Request, response: Response) {
    const { address_id, name } = request.body;

    const createInstitutionUseCase = container.resolve(
      CreateInstitutionUseCase
    );

    await createInstitutionUseCase.execute({
      address_id,
      name,
    });

    return response.status(201).send();
  }
}
