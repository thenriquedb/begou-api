import { Repository } from "typeorm";

import { AppDataSource } from "@shared/infra/database/typeorm/data-source";
import { ISpecieRepository } from "@modules/animals/repositories/ISpecieRepository";
import { Specie } from "@modules/animals/infra/typeorm/entities/Specie";

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
