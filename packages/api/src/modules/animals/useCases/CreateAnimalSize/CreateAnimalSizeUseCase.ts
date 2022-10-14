import { inject, injectable } from "tsyringe";

import { IAnimalSizesRepository } from "@modules/animals/repositories/IAnimalSizeRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateAnimalSizeUseCase {
  private animalSizesRepository: IAnimalSizesRepository;

  constructor(
    @inject("AnimalSizesRepository")
    animalSizesRepository: IAnimalSizesRepository
  ) {
    this.animalSizesRepository = animalSizesRepository;
  }

  async execute({ name, description }: IRequest) {
    const animalSizeAlreadyExists = await this.animalSizesRepository.findByName(
      name
    );

    if (animalSizeAlreadyExists) {
      throw new AppError("Animal size already exists");
    }

    await this.animalSizesRepository.create({ name, description });
  }
}
