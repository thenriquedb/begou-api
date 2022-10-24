import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateAdoptionRequestUseCase } from "./CreateAdoptionRequestUseCase";

export class CreateAdoptionRequestController {
  async handle(request: Request, response: Response) {
    const { animal_id, user_id } = request.body;
    const { institution_id } = request.params;

    const createAdoptionRequestUseCase = container.resolve(
      CreateAdoptionRequestUseCase
    );

    await createAdoptionRequestUseCase.execute({
      institution_id,
      animal_id,
      user_id,
    });

    return response.status(201).send();
  }
}
