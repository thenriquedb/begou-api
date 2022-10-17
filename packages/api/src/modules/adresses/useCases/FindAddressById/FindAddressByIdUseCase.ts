import { inject, injectable } from "tsyringe";

import { IAddressRepository } from "@modules/adresses/repositories/IAddressRepository";

export interface IRequest {
  complement?: string;
  neighborhood: string;
  street: string;
  ufInitials: string;
  zipCode: string;
}

@injectable()
export class FindAddressByIdUseCase {
  private addressRepository: IAddressRepository;

  constructor(
    @inject("AddressRepository")
    addressRepository: IAddressRepository
  ) {
    this.addressRepository = addressRepository;
  }

  async execute(addressId: string) {
    const address = await this.addressRepository.findById(addressId);
    return address;
  }
}
