import { Repository } from "typeorm";

import { AppDataSource } from "@shared/infra/database/typeorm/data-source";
import { IAnimalSizesRepository } from "@modules/animals/repositories/IAnimalSizeRepository";
import { AnimalSize } from "@modules/animals/infra/typeorm/entities/AnimalSize";
import { ICreateAnimalSizeDTO } from "@modules/animals/dtos/ICreateAnimalSizeDTO";

export class AnimalSizesRepository implements IAnimalSizesRepository {
  private repository: Repository<AnimalSize>;

  constructor() {
    this.repository = AppDataSource.getRepository(AnimalSize);
  }

  async create(data: ICreateAnimalSizeDTO) {
    const { description, name } = data;

    const animalSize = this.repository.create({
      name,
      description,
    });

    await this.repository.save(animalSize);
  }

  async findByName(name: string) {
    const animalSize = await this.repository.findOneBy({ name });
    return animalSize;
  }

  async findById(id: string) {
    const animalSize = await this.repository.findOneBy({ id });
    return animalSize;
  }

  async list() {
    const animalSizes = this.repository.find();
    return animalSizes;
  }
}
