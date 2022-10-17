import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateAddressUseCase } from "./CreateAddressUseCase";

export class CreateAddressController {
  async handle(request: Request, response: Response) {
    const { neighborhood, street, ufInitials, zipCode, complement } =
      request.body;

    const createAddressUseCase = container.resolve(CreateAddressUseCase);

    await createAddressUseCase.execute({
      neighborhood,
      street,
      ufInitials,
      zipCode,
      complement,
    });

    return response.status(201).send();
  }
}
