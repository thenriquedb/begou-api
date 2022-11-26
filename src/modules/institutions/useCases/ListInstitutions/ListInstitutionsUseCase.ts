import { inject, injectable } from "tsyringe";

import { IInstitutionRepository } from "@modules/institutions/repositories/IInstitutionRepository";
import { IFindInstitutionDTO } from "@modules/institutions/dtos/IFindInstitutionDTO";

type IRequest = IFindInstitutionDTO;

@injectable()
export class ListInstitutionsUseCase {
  private instituitionRepository: IInstitutionRepository;

  constructor(
    @inject("InstitutionRepository")
    instituitionRepository: IInstitutionRepository
  ) {
    this.instituitionRepository = instituitionRepository;
  }

  async execute({ zip_code }: IRequest) {
    const instituitions = await this.instituitionRepository.find({ zip_code });
    return instituitions;
  }
}
