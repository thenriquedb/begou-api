import { Repository } from "typeorm";

import { AppDataSource } from "@shared/infra/http/typeorm/data-source";

import { AnimalSize } from "../../entities/AnimalSize";
import {
  IAnimalSizesRepository,
  ICreateAnimalSizeDTO,
} from "../IAnimalSizeRepository";

export const AnimalSizesRepositorys = AppDataSource.getRepository(AnimalSize);

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

  async list() {
    const animalSizes = this.repository.find();
    return animalSizes;
  }
}
