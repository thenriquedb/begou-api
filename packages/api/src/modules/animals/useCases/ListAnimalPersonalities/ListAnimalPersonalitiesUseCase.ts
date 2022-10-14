import { inject, injectable } from "tsyringe";

import { IAnimalPersonalitiesRepository } from "@modules/animals/repositories/IAnimalPersonalitiesRepository";

@injectable()
export class ListAnimalPersonalitiesUseCase {
  private animalPersonalitiesRepository: IAnimalPersonalitiesRepository;

  constructor(
    @inject("AnimalPersonalitiesRepository")
    animalPersonalitiesRepository: IAnimalPersonalitiesRepository
  ) {
    this.animalPersonalitiesRepository = animalPersonalitiesRepository;
  }

  async execute() {
    const animalPersonalities = await this.animalPersonalitiesRepository.list();
    return animalPersonalities;
  }
}
