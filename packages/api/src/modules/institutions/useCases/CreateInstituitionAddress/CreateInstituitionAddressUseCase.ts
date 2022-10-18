import { inject, injectable } from "tsyringe";

import { IAddressRepository } from "@modules/adresses/repositories/IAddressRepository";
import { IInstitutionRepository } from "@modules/institutions/repositories/IInstitutionRepository";
import { ICityRepository } from "@modules/adresses/repositories/ICityRepository";
import { IUfRepository } from "@modules/adresses/repositories/IUfRepository";
import { IAddressService } from "@data/protocols/address-service/IAddressService";
import { BadRequestError } from "@shared/errors/BadRequestError";
import { Institution } from "@modules/institutions/entities/Institution";

export interface IRequest {
  complement?: string;
  neighborhood: string;
  street: string;
  ufInitials: string;
  zipCode: string;
  instituitionId: string;
}

@injectable()
export class CreateInstituitionAddressUseCase {
  private instituitionRepository: IInstitutionRepository;

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
    @inject("InstitutionRepository")
    instituitionRepository: IInstitutionRepository,
    @inject("AddressService")
    addressService: IAddressService
  ) {
    this.addressRepository = addressRepository;
    this.ufRepository = ufRepository;
    this.cityRepository = cityRepository;
    this.addressService = addressService;
    this.instituitionRepository = instituitionRepository;
  }

  private async createUf(initials: string) {
    try {
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
    const {
      neighborhood,
      street,
      ufInitials,
      zipCode,
      complement,
      instituitionId,
    } = data;

    const instituition = await this.instituitionRepository.findById(
      instituitionId
    );

    if (instituition.address) {
      throw new BadRequestError("Instituition already has address");
    }

    await this.createUf(ufInitials);
    await this.createCity(zipCode);

    await this.instituitionRepository.createAddress(instituitionId, {
      neighborhood,
      street,
      ufInitials,
      zipCode,
      complement,
    });
  }
}
