import { In, Repository } from "typeorm";

import { AppDataSource } from "@shared/infra/db/typeorm/data-source";

import { ICreateAnimalHealthDTO } from "../../dtos/ICreateAnimalHealthDTO";
import { AnimalHealth } from "../../entities/AnimalHealth";
import { IAnimalHealthRepository } from "../IAnimalHealthRepository";

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
