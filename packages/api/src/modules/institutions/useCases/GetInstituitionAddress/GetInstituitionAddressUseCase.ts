import { inject, injectable } from "tsyringe";

import { IInstitutionAddressRepository } from "@modules/adresses/repositories/IInstitutionAddressRepository";

@injectable()
export class GetInstituitionAddressUseCase {
  private institutionAddressRepository: IInstitutionAddressRepository;

  constructor(
    @inject("InstitutionAddressRepository")
    institutionAddressRepository: IInstitutionAddressRepository
  ) {
    this.institutionAddressRepository = institutionAddressRepository;
  }

  async execute(instituitionId: string) {
    const address = await this.institutionAddressRepository.findById(
      instituitionId
    );

    return address;
  }
}
