import { Repository } from "typeorm";

import { AppDataSource } from "@shared/infra/database/typeorm/data-source";
import { IInstitutionAddressRepository } from "@modules/adresses/repositories/IInstitutionAddressRepository";
import { Address } from "@modules/adresses/infra/typeorm/entities/Address";

import { ICreateAddressDTO } from "../../dtos/ICreateAddressDTO";

export class InstitutionAddressRepository implements IInstitutionAddressRepository {
  private repository: Repository<Address>;

  constructor() {
    this.repository = AppDataSource.getRepository(Address);
  }

  async create(data: ICreateAddressDTO) {
    const { neighborhood, street, city, uf, complement } = data;
    const address = this.repository.create({
      complement,
      uf,
      street,
      city,
      neighborhood,
    });

    await this.repository.save(address);
  }

  async findById(id: string) {
    const address = await this.repository.find({
      where: { id },
      relations: {
        uf: true,
        city: true,
      },
      select: {
        city: { name: true, zip_code: true },
        uf: { name: true, initials: true },
      },
    });

    return address[0];
  }
}
