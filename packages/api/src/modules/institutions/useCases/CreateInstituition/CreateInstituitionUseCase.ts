import { inject, injectable } from "tsyringe";

import { IInstitutionRepository } from "@modules/institutions/repositories/IInstitutionRepository";
import { ICreateInstitutionDTO } from "@modules/institutions/dtos/ICreateInstitutionDTO";

@injectable()
export class CreateInstituitionUseCase {
  private instituitionRepository: IInstitutionRepository;

  constructor(
    @inject("InstitutionRepository")
    instituitionRepository: IInstitutionRepository
  ) {
    this.instituitionRepository = instituitionRepository;
  }

  async execute({ name, address_id }: ICreateInstitutionDTO) {
    await this.instituitionRepository.create({ name, address_id });
  }
}
