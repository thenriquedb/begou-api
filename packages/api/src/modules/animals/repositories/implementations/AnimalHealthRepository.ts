import { Repository } from "typeorm";

import { AppDataSource } from "@shared/infra/http/typeorm/data-source";

import { AnimalHealth } from "../../entities/AnimalHealth";
import {
  IAnimalHealthRepository,
  ICreateAnimalHealthDTO,
} from "../IAnimalHealthRepository";

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

  async list() {
    const animalHealths = this.repository.find();
    return animalHealths;
  }
}
