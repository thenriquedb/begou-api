import { inject, injectable } from "tsyringe";

import { IAnimalPersonalitiesRepository } from "@modules/animals/repositories/IAnimalPersonalitiesRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateAnimalPersonalityUseCase {
  private animalPersonalitiesRepository: IAnimalPersonalitiesRepository;

  constructor(
    @inject("AnimalPersonalitiesRepository")
    animalPersonalitiesRepository: IAnimalPersonalitiesRepository
  ) {
    this.animalPersonalitiesRepository = animalPersonalitiesRepository;
  }

  async execute({ name, description }: IRequest) {
    const animalSizeAlreadyExists =
      await this.animalPersonalitiesRepository.findByName(name);

    if (animalSizeAlreadyExists) {
      throw new AppError("Animal personality already exists");
    }

    await this.animalPersonalitiesRepository.create({ name, description });
  }
}
