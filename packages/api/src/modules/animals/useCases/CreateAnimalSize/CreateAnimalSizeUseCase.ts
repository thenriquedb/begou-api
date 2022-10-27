import { inject, injectable } from "tsyringe";

import { IAnimalSizesRepository } from "@modules/animals/repositories/IAnimalSizeRepository";
import { BadRequestError } from "@shared/core/errors/BadRequestError";

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
      throw new BadRequestError("Animal size already exists");
    }

    await this.animalSizesRepository.create({ name, description });
  }
}
