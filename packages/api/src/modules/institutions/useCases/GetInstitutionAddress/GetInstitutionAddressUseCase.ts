import { inject, injectable } from "tsyringe";

import { IInstitutionRepository } from "@modules/institutions/repositories/IInstitutionRepository";

@injectable()
export class GetInstitutionAddressUseCase {
  private institutionRepository: IInstitutionRepository;

  constructor(
    @inject("InstitutionRepository")
    institutionRepository: IInstitutionRepository
  ) {
    this.institutionRepository = institutionRepository;
  }

  async execute(instituitionId: string) {
    const institution = await this.institutionRepository.findById(
      instituitionId
    );

    return institution.address;
  }
}
