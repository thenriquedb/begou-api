import { Repository } from "typeorm";

import { AppDataSource } from "@shared/infra/http/typeorm/data-source";

import { AnimalPersonality } from "../../entities/AnimalPersonality";
import {
  IAnimalPersonalitiesRepository,
  ICreateAnimalPersonalityDTO,
} from "../IAnimalPersonalitiesRepository";

export class AnimalPersonalitiesRepository
  implements IAnimalPersonalitiesRepository {
  private repository: Repository<AnimalPersonality>;

  constructor() {
    this.repository = AppDataSource.getRepository(AnimalPersonality);
  }

  async create(data: ICreateAnimalPersonalityDTO) {
    const { description, name } = data;

    const animalPersonality = this.repository.create({
      name,
      description,
    });

    await this.repository.save(animalPersonality);
  }

  async findByName(name: string) {
    const animalPersonality = await this.repository.findOneBy({ name });
    return animalPersonality;
  }

  async list() {
    const animalPersonalitys = this.repository.find();
    return animalPersonalitys;
  }
}
