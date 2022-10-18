import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateInstituitionUseCase } from "./CreateInstituitionUseCase";

export class CreateInstituitionController {
  async handle(request: Request, response: Response) {
    const { address_id, name } = request.body;

    const createInstituitionUseCase = container.resolve(
      CreateInstituitionUseCase
    );

    await createInstituitionUseCase.execute({
      address_id,
      name,
    });

    return response.status(201).send();
  }
}
