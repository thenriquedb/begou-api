import { inject, injectable } from "tsyringe";

import { IAnimalHealthRepository } from "@modules/animals/repositories/IAnimalHealthRepository";
import { BadRequestError } from "@shared/core/errors/BadRequestError";

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
      throw new BadRequestError("Animal health already exists");
    }

    await this.animalHealthRepository.create({ name, description });
  }
}
