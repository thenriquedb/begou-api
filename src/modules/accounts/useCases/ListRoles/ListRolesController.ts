import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListRolesUseCase } from "./ListRolesUseCase";

export class ListRolesController {
  async handle(request: Request, response: Response) {
    const listRolesUseCase = container.resolve(ListRolesUseCase);

    const roles = await listRolesUseCase.execute();

    return response.status(200).json(roles);
  }
}
