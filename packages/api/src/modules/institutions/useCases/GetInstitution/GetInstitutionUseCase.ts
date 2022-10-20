import { inject, injectable } from "tsyringe";

import { IInstitutionRepository } from "@modules/institutions/repositories/IInstitutionRepository";

@injectable()
export class GetInstitutionUseCase {
  private instituitionRepository: IInstitutionRepository;

  constructor(
    @inject("InstitutionRepository")
    instituitionRepository: IInstitutionRepository
  ) {
    this.instituitionRepository = instituitionRepository;
  }

  async execute(id: string) {
    const instituition = await this.instituitionRepository.findById(id);
    return instituition;
  }
}
