import { Repository } from "typeorm";

import { AppDataSource } from "@shared/infra/http/typeorm/data-source";
import { ICreateInstitutionDTO } from "@modules/institutions/dtos/ICreateInstitutionDTO";
import { Institution } from "@modules/institutions/entities/Institution";
import { Address } from "@modules/adresses/entities/Address";
import { IFindInstitutionDTO } from "@modules/institutions/dtos/IFindInstitutionDTO";

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
    const institution = await this.repository.findOne({
      where: { id },
      relations: {
        address: {
          city: true,
          uf: true,
        },
      },
    });
    return institution;
  }

  async find({ zip_code }: IFindInstitutionDTO) {
    const institutions = await this.repository.find({
      where: {
        address: {
          city: {
            zip_code,
          },
        },
      },
    });

    return institutions;
  }

  async createAddress(id: string, data: Address) {
    const { neighborhood, street, complement, city, uf } = data;

    const address = new Address();
    address.neighborhood = neighborhood;
    address.street = street;
    address.uf = uf;
    address.city = city;
    address.complement = complement;

    const instituition = await this.findById(id);
    instituition.address = address;

    await AppDataSource.manager.save(address);
    await AppDataSource.manager.save(instituition);
  }

  async updateAddress(id: string, data: Partial<Address>) {
    const { neighborhood, street, city, complement, uf } = data;
    const instituition = await this.findById(id);

    instituition.address.neighborhood = neighborhood;
    instituition.address.street = street;
    instituition.address.uf = uf;
    instituition.address.city = city;
    instituition.address.complement = complement;

    AppDataSource.manager.save(instituition);
  }

  async update(id: string, data: Partial<Institution>) {
    await this.repository.update({ id }, data);
  }
}
