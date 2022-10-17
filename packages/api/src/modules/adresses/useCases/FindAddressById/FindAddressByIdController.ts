import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindAddressByIdUseCase } from "./FindAddressByIdUseCase";

export class FindAddressByIdController {
  async handle(request: Request, response: Response) {
    const { address_id } = request.params;

    const findAddressByIdUseCase = container.resolve(FindAddressByIdUseCase);

    const address = await findAddressByIdUseCase.execute(address_id);

    return response.status(201).json(address);
  }
}
