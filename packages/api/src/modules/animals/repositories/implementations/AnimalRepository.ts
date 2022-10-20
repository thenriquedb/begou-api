import { Repository } from "typeorm";

import { AppDataSource } from "@shared/infra/http/typeorm/data-source";
import { ICreateAnimalDTO } from "@modules/animals/dtos/ICreateAnimalDTO";

import { Animal } from "../../entities/Animal";
import { IAnimalRepository } from "../IAnimalRepository";

export class AnimalRepository implements IAnimalRepository {
  private repository: Repository<Animal>;

  constructor() {
    this.repository = AppDataSource.getRepository(Animal);
  }

  async create(data: ICreateAnimalDTO) {
    const {
      genre,
      healths,
      institution,
      name,
      personalities,
      size,
      specie,
      description,
      stageOfLife,
    } = data;

    const animal = this.repository.create({
      genre,
      healths,
      institution,
      name,
      personalities,
      size,
      specie,
      description,
      stageOfLife,
    });

    await this.repository.save(animal);
  }

  async findById(id: string) {
    const animal = await this.repository.findOne({
      where: { id },
      relations: {
        healths: true,
        personalities: true,
        stage_of_life: true,
        size: true,
        specie: true,
      },
    });

    return animal;
  }
}
