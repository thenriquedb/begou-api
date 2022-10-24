import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateAdoptionRequestUseCase } from "./UpdateAdoptionRequestStatusUseCase";

export class UpdateAdoptionRequestController {
  async handle(request: Request, response: Response) {
    const { status_id } = request.body;
    const { adoption_id } = request.params;

    const updateAdoptionRequestUseCase = container.resolve(UpdateAdoptionRequestUseCase);

    await updateAdoptionRequestUseCase.execute({
      adoption_id,
      status_id,
    });

    return response.status(202).send();
  }
}
