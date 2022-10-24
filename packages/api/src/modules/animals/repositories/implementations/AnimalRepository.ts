import { Repository } from "typeorm";

import { AppDataSource } from "@shared/infra/db/typeorm/data-source";
import { ICreateAnimalDTO } from "@modules/animals/dtos/ICreateAnimalDTO";
import { IFindAnimalDTO } from "@modules/animals/dtos/IFindAnimalDTO";

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
      stage_of_life,
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
      stage_of_life,
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

  async findByInstitutionId(institution_id: string, data: IFindAnimalDTO) {
    const { available, size_id, specie_id } = data;

    const animals = await this.repository.find({
      where: {
        institution_id,
        available,
        size: {
          id: size_id,
        },
        specie: {
          id: specie_id,
        },
      },
      order: {
        created_at: {
          direction: "ASC",
        },
      },
      relations: {
        healths: true,
        personalities: true,
        stage_of_life: true,
        size: true,
        specie: true,
      },
    });

    return animals;
  }
}
