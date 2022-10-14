import { inject, injectable } from "tsyringe";

import { IAnimalHealthRepository } from "@modules/animals/repositories/IAnimalHealthRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateAnimalHealthUseCase {
  private animalHealthRepository: IAnimalHealthRepository;

  constructor(
    @inject("AnimalHealthRepository")
    animalHealthRepository: IAnimalHealthRepository
  ) {
    this.animalHealthRepository = animalHealthRepository;
  }

  async execute({ name, description }: IRequest) {
    const animalSizeAlreadyExists =
      await this.animalHealthRepository.findByName(name);

    if (animalSizeAlreadyExists) {
      throw new AppError("Animal health already exists");
    }

    await this.animalHealthRepository.create({ name, description });
  }
}
