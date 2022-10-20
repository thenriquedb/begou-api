import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateInstitutionAddressUseCase } from "./CreateInstitutionAddressUseCase";

export class CreateInstitutionAddressController {
  async handle(request: Request, response: Response) {
    const { neighborhood, street, ufInitials, zipCode, complement } =
      request.body;

    const { institution_id } = request.params;

    const createInstitutionAddressUseCase = container.resolve(
      CreateInstitutionAddressUseCase
    );

    await createInstitutionAddressUseCase.execute({
      neighborhood,
      street,
      ufInitials,
      zipCode,
      complement,
      instituitionId: institution_id,
    });

    return response.status(201).send();
  }
}
