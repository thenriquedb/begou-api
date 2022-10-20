import { Repository } from "typeorm";

import { AppDataSource } from "@shared/infra/http/typeorm/data-source";

import { Specie } from "../../entities/Specie";
import { ISpecieRepository } from "../ISpecieRepository";

export class SpecieRepository implements ISpecieRepository {
  private repository: Repository<Specie>;

  constructor() {
    this.repository = AppDataSource.getRepository(Specie);
  }

  async findById(id: string) {
    const specie = await this.repository.findOneBy({ id });
    return specie;
  }

  async list() {
    const species = await this.repository.find();
    return species;
  }
}
