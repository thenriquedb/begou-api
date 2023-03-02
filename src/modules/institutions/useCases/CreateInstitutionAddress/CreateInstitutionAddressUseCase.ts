import { inject, injectable } from "tsyringe";

import { IInstitutionRepository } from "@modules/institutions/repositories/IInstitutionRepository";
import { ICityRepository } from "@modules/adresses/repositories/ICityRepository";
import { IUfRepository } from "@modules/adresses/repositories/IUfRepository";
import { IAddressService } from "@data/ports/address-service/IAddressService";
import { BadRequestError } from "@shared/core/errors/BadRequestError";

export interface IRequest {
  complement?: string;
  neighborhood: string;
  street: string;
  ufInitials: string;
  zipCode: string;
  instituitionId: string;
}

@injectable()
export class CreateInstitutionAddressUseCase {
  private instituitionRepository: IInstitutionRepository;

  private cityRepository: ICityRepository;
  private ufRepository: IUfRepository;
  private addressService: IAddressService;

  constructor(
    @inject("UfRepository")
    ufRepository: IUfRepository,
    @inject("CityRepository")
    cityRepository: ICityRepository,
    @inject("InstitutionRepository")
    instituitionRepository: IInstitutionRepository,
    @inject("AddressService")
    addressService: IAddressService
  ) {
    this.ufRepository = ufRepository;
    this.cityRepository = cityRepository;
    this.addressService = addressService;
    this.instituitionRepository = instituitionRepository;
  }

  private async getOrCreateUf(initials: string) {
    try {
      const ufName = this.addressService.getUfNameByInitials(initials);
      let uf = await this.ufRepository.findByInitials(initials);

      if (uf) return uf;

      await this.ufRepository.create({ initials, name: ufName });
      uf = await this.ufRepository.findByInitials(initials);
      return uf;
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }

  private async getOrCreateCity(zipCode: string) {
    let city = await this.cityRepository.findByZipCode(zipCode);
    if (city) return city;

    const completeAddress = await this.addressService.getAddressByZipCode(zipCode);

    if (!completeAddress) {
      throw new BadRequestError("Invalid zip code");
    }

    await this.cityRepository.create({
      name: completeAddress.city,
      zipCode,
    });

    city = await this.cityRepository.findByZipCode(zipCode);
    return city;
  }

  async execute(data: IRequest) {
    const { neighborhood, street, ufInitials, zipCode, complement, instituitionId } =
      data;

    const zipCodeIsValid = this.addressService.zipCodeIsValid(zipCode);
    if (!zipCodeIsValid) {
      throw new Error("Zip code must contain exactly 8 characters");
    }

    const instituition = await this.instituitionRepository.findById(instituitionId);

    if (instituition.address) {
      throw new BadRequestError("Institution already has address");
    }

    const uf = await this.getOrCreateUf(ufInitials);
    const city = await this.getOrCreateCity(zipCode);

    await this.instituitionRepository.createAddress(instituitionId, {
      neighborhood,
      street,
      uf,
      city,
      complement,
    });
  }
}
