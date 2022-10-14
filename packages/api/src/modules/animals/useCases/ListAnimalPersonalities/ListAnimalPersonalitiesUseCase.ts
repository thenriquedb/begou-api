import { inject, injectable } from "tsyringe";

import { IAnimalPersonalityRepository } from "@modules/animals/repositories/IAnimalPersonalityRepository";

@injectable()
export class ListAnimalPersonalitiesUseCase {
  private animalPersonalityRepository: IAnimalPersonalityRepository;

  constructor(
    @inject("AnimalPersonalityRepository")
    animalPersonalityRepository: IAnimalPersonalityRepository
  ) {
    this.animalPersonalityRepository = animalPersonalityRepository;
  }

  async execute() {
    const animalPersonalities = await this.animalPersonalityRepository.list();
    return animalPersonalities;
  }
}
