import { Repository } from "typeorm";

import { AppDataSource } from "@shared/infra/http/typeorm/data-source";

import { Address } from "../../entities/Address";
import { IAddressRepository, ICreateAddressDTO } from "../IAddressRepository";

export class AddressRepository implements IAddressRepository {
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
      uf: ufInitials,
      zip_code: zipCode,
      city: zipCode,
    });

    await this.repository.save(address);
  }

  async findById(id: string) {
    const address = await this.repository.findOneBy({ id });
    return address;
  }
}
