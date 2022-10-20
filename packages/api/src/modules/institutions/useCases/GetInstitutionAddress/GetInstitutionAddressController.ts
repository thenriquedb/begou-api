import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetInstitutionAddressUseCase } from "./GetInstitutionAddressUseCase";

export class GetInstitutionAddressController {
  async handle(request: Request, response: Response) {
    const { institution_id } = request.params;

    const getInstitutionAddressUseCase = container.resolve(
      GetInstitutionAddressUseCase
    );

    const address = await getInstitutionAddressUseCase.execute(institution_id);

    return response.status(201).json(address);
  }
}
