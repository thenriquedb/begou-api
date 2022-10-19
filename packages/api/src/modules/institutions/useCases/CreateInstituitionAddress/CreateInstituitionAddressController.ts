import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateInstituitionAddressUseCase } from "./CreateInstituitionAddressUseCase";

export class CreateInstituitionAddressController {
  async handle(request: Request, response: Response) {
    const { neighborhood, street, ufInitials, zipCode, complement } =
      request.body;

    const { institution_id } = request.params;

    const createInstituitionAddressUseCase = container.resolve(
      CreateInstituitionAddressUseCase
    );

    await createInstituitionAddressUseCase.execute({
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
