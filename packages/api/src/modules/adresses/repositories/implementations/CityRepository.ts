import { Repository } from "typeorm";

import { AppDataSource } from "@shared/infra/http/typeorm/data-source";

import { City } from "../../entities/City";
import { ICityRepository, ICreateCityDTO } from "../ICityRepository";

export class CityRepository implements ICityRepository {
  private repository: Repository<City>;

  constructor() {
    this.repository = AppDataSource.getRepository(City);
  }

  async create(data: ICreateCityDTO) {
    const { name, zipCode } = data;

    const city = this.repository.create({ name, zip_code: zipCode });

    await this.repository.save(city);
  }

  async findByZipCode(zipCode: string) {
    const city = this.repository.findOneBy({ zip_code: zipCode });
    return city;
  }

  async findByName(name: string) {
    const city = this.repository.findOneBy({ name });
    return city;
  }
}
