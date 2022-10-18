import { inject, injectable } from "tsyringe";

import { IAddressRepository } from "@modules/adresses/repositories/IAddressRepository";

@injectable()
export class FindInstituitionAddressUseCase {
  private addressRepository: IAddressRepository;

  constructor(
    @inject("AddressRepository")
    addressRepository: IAddressRepository
  ) {
    this.addressRepository = addressRepository;
  }

  async execute(instituitionId: string) {
    const address = await this.addressRepository.findById(instituitionId);
    return address;
  }
}
