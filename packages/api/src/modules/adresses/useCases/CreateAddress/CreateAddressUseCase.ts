import { inject, injectable } from "tsyringe";

import { IAddressRepository } from "@modules/adresses/repositories/IAddressRepository";
import { ICityRepository } from "@modules/adresses/repositories/ICityRepository";
import { IUfRepository } from "@modules/adresses/repositories/IUfRepository";
import { BadRequestError } from "@shared/errors/BadRequestError";
import { IAddressService } from "@data/protocols/address-service/IAddressService";

export interface IRequest {
  complement?: string;
  neighborhood: string;
  street: string;
  ufInitials: string;
  zipCode: string;
}

@injectable()
export class CreateAddressUseCase {
  private cityRepository: ICityRepository;
  private ufRepository: IUfRepository;
  private addressRepository: IAddressRepository;
  private addressService: IAddressService;

  constructor(
    @inject("AddressRepository")
    addressRepository: IAddressRepository,
    @inject("UfRepository")
    ufRepository: IUfRepository,
    @inject("CityRepository")
    cityRepository: ICityRepository,
    @inject("AddressService")
    addressService: IAddressService
  ) {
    this.addressRepository = addressRepository;
    this.ufRepository = ufRepository;
    this.cityRepository = cityRepository;
    this.addressService = addressService;
  }

  private async createUf(initials: string) {
    try {
      console.log({ addressService: this.addressService });

      const ufName = this.addressService.getUfNameByInitials(initials);

      const ufAlreadyExists = await this.ufRepository.findByInitials(initials);

      if (ufAlreadyExists) return;

      await this.ufRepository.create({ initials, name: ufName });
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }

  private async createCity(zipCode: string) {
    const cityAlreadyExists = await this.cityRepository.findByZipCode(zipCode);
    if (cityAlreadyExists) return;

    const completeAddress = await this.addressService.getAddressByZipCode(
      zipCode
    );

    if (!completeAddress) {
      throw new BadRequestError("Invalid zip code");
    }

    await this.cityRepository.create({
      name: completeAddress.city,
      zipCode,
    });
  }

  async execute(data: IRequest) {
    const { neighborhood, street, ufInitials, zipCode, complement } = data;
    await this.createUf(ufInitials);
    await this.createCity(zipCode);
    await this.addressRepository.create({
      neighborhood,
      street,
      ufInitials,
      zipCode,
      complement,
    });
  }
}
