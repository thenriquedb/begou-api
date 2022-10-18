import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetInstituitionUseCase } from "./GetInstituitionUseCase";

export class GetInstituitionController {
  async handle(request: Request, response: Response) {
    const { instituition_id } = request.params;

    const getInstituitionUseCase = container.resolve(GetInstituitionUseCase);

    const institution = await getInstituitionUseCase.execute(instituition_id);

    return response.status(201).json(institution);
  }
}
