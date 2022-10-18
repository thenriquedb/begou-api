import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListRolesUseCase } from "./ListRoleUseCase";

export class ListRolesController {
  async handle(request: Request, response: Response) {
    const listRolesUseCase = container.resolve(ListRolesUseCase);
    console.log(request.user);

    const roles = await listRolesUseCase.execute();

    return response.status(201).json(roles);
  }
}
