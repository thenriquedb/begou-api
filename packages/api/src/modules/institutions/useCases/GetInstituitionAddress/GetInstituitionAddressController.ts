import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetInstituitionAddressUseCase } from "./GetInstituitionAddressUseCase";

export class GetInstituitionAddressController {
  async handle(request: Request, response: Response) {
    const { institution_id } = request.params;

    const getInstituitionAddressUseCase = container.resolve(
      GetInstituitionAddressUseCase
    );

    const address = await getInstituitionAddressUseCase.execute(institution_id);

    return response.status(201).json(address);
  }
}
