import { In, Repository } from "typeorm";

import { AppDataSource } from "@shared/infra/http/typeorm/data-source";

import { AnimalPersonality } from "../../entities/AnimalPersonality";
import { IAnimalPersonalityRepository } from "../IAnimalPersonalityRepository";
import { ICreateAnimalPersonalityDTO } from "../../dtos/ICreateAnimalPersonalityDTO";

export class AnimalPersonalityRepository
  implements IAnimalPersonalityRepository {
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

  async findById(id: string) {
    const animalPersonality = await this.repository.findOneBy({ id });
    return animalPersonality;
  }

  async findByIds(ids: string[]) {
    const animalPersonalitys = this.repository.findBy({ id: In(ids) });
    return animalPersonalitys;
  }

  async list() {
    const animalPersonalitys = this.repository.find();
    return animalPersonalitys;
  }
}
