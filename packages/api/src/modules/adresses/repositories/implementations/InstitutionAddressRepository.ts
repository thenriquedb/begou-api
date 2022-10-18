import { Repository } from "typeorm";

import { AppDataSource } from "@shared/infra/http/typeorm/data-source";

import { Address } from "../../entities/Address";
import { ICreateAddressDTO } from "../../dtos/ICreateAddressDTO";
import { IInstitutionAddressRepository } from "../IInstitutionAddressRepository";

export class InstitutionAddressRepository
  implements IInstitutionAddressRepository {
  private repository: Repository<Address>;

  constructor() {
    this.repository = AppDataSource.getRepository(Address);
  }

  async create(data: ICreateAddressDTO) {
    const { neighborhood, street, zipCode, ufInitials, complement } = data;
    const address = this.repository.create({
      complement,
      neighborhood,
      street,
      uf_initials: ufInitials,
      zip_code: zipCode,
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
