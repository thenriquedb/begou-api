import { inject, injectable } from "tsyringe";

import { IAnimalPersonalityRepository } from "@modules/animals/repositories/IAnimalPersonalityRepository";
import { BadRequestError } from "@shared/core/errors/BadRequestError";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateAnimalPersonalityUseCase {
  private animalPersonalityRepository: IAnimalPersonalityRepository;

  constructor(
    @inject("AnimalPersonalityRepository")
    animalPersonalityRepository: IAnimalPersonalityRepository
  ) {
    this.animalPersonalityRepository = animalPersonalityRepository;
  }

  async execute({ name, description }: IRequest) {
    const animalSizeAlreadyExists = await this.animalPersonalityRepository.findByName(
      name
    );

    if (animalSizeAlreadyExists) {
      throw new BadRequestError("Animal personality already exists");
    }

    await this.animalPersonalityRepository.create({ name, description });
  }
}
