import { Request, Response } from "express";
import { container } from "tsyringe";

import { IFindInstitutionDTO } from "@modules/institutions/dtos/IFindInstitutionDTO";

import { ListInstitutionsUseCase } from "./ListInstitutionsUseCase";

type QueryParams = IFindInstitutionDTO;

export class ListInstitutionsController {
  async handle(request: Request, response: Response) {
    const { zip_code } = request.query as QueryParams;

    const listInstitutionsUseCase = container.resolve(ListInstitutionsUseCase);

    const institutions = await listInstitutionsUseCase.execute({ zip_code });

    return response.status(201).json(institutions);
  }
}
