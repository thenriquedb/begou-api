import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetInstituitionAddressUseCase } from "./GetInstituitionAddressUseCase";

export class GetAddressByIdController {
  async handle(request: Request, response: Response) {
    const { address_id } = request.params;

    const findAddressByIdUseCase = container.resolve(
      GetInstituitionAddressUseCase
    );

    const address = await findAddressByIdUseCase.execute(address_id);

    return response.status(201).json(address);
  }
}
