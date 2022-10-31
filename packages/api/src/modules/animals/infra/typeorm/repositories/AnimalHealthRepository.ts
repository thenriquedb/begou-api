import { In, Repository } from "typeorm";

import { AppDataSource } from "@shared/infra/database/typeorm/data-source";
import { IAnimalHealthRepository } from "@modules/animals/repositories/IAnimalHealthRepository";
import { AnimalHealth } from "@modules/animals/infra/typeorm/entities/AnimalHealth";
import { ICreateAnimalHealthDTO } from "@modules/animals/dtos/ICreateAnimalHealthDTO";

export class AnimalHealthRepository implements IAnimalHealthRepository {
  private repository: Repository<AnimalHealth>;

  constructor() {
    this.repository = AppDataSource.getRepository(AnimalHealth);
  }

  async create(data: ICreateAnimalHealthDTO) {
    const { description, name } = data;

    const animalHealth = this.repository.create({
      name,
      description,
    });

    await this.repository.save(animalHealth);
  }

  async findByName(name: string) {
    const animalHealth = await this.repository.findOneBy({ name });
    return animalHealth;
  }

  async findById(id: string) {
    const animalHealth = await this.repository.findOneBy({ id });
    return animalHealth;
  }

  async findByIds(ids: string[]) {
    const animalHealths = await this.repository.findBy({ id: In(ids) });
    return animalHealths;
  }

  async list() {
    const animalHealths = this.repository.find();
    return animalHealths;
  }
}
