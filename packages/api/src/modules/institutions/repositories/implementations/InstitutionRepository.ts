import { Repository } from "typeorm";

import { AppDataSource } from "@shared/infra/http/typeorm/data-source";
import { ICreateInstitutionDTO } from "@modules/institutions/dtos/ICreateInstitutionDTO";
import { Institution } from "@modules/institutions/entities/Institution";
import { ICreateAddressDTO } from "@modules/adresses/dtos/ICreateAddressDTO";
import { Address } from "@modules/adresses/entities/Address";

import { IInstitutionRepository } from "../IInstitutionRepository";

export class InstitutionRepository implements IInstitutionRepository {
  private repository: Repository<Institution>;

  constructor() {
    this.repository = AppDataSource.getRepository(Institution);
  }

  async create(data: ICreateInstitutionDTO) {
    const { name } = data;
    const institution = this.repository.create({ name });
    await this.repository.save(institution);
  }

  async findById(id: string) {
    const institution = await this.repository.find({
      where: { id },
      relations: { address: true },
    });
    return institution[0];
  }

  async list() {
    const institutions = await this.repository.find();
    return institutions;
  }

  async createAddress(id: string, data: ICreateAddressDTO) {
    const { neighborhood, street, ufInitials, zipCode, complement } = data;

    const address = new Address();
    address.neighborhood = neighborhood;
    address.street = street;
    address.uf_initials = ufInitials;
    address.zip_code = zipCode;
    address.complement = complement;

    const instituition = await this.findById(id);
    instituition.address = address;

    AppDataSource.manager.save(address);
    AppDataSource.manager.save(instituition);
  }

  async updateAddress(id: string, data: ICreateAddressDTO) {
    const { neighborhood, street, ufInitials, zipCode, complement } = data;
    const instituition = await this.findById(id);

    instituition.address.neighborhood = neighborhood;
    instituition.address.street = street;
    instituition.address.uf_initials = ufInitials;
    instituition.address.zip_code = zipCode;
    instituition.address.complement = complement;

    AppDataSource.manager.save(instituition);
  }

  async update(id: string, data: Partial<Institution>) {
    await this.repository.update({ id }, data);
  }
}
