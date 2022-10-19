import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateInstituitionAssociateUseCase } from "./CreateInstituitionAssociateUseCase";

export class CreateInstituitionAssociateController {
  async handle(request: Request, response: Response) {
    const { associates } = request.body;
    const { institution_id } = request.params;

    const createInstituitionUseCase = container.resolve(
      CreateInstituitionAssociateUseCase
    );

    await createInstituitionUseCase.execute({
      institution_id,
      associates,
    });

    return response.status(201).send();
  }
}
