import { inject, injectable } from "tsyringe";

import { IAnimalHealthRepository } from "@modules/animals/repositories/IAnimalHealthRepository";

@injectable()
export class ListAnimalHealthUseCase {
  private animalHealthRepository: IAnimalHealthRepository;

  constructor(
    @inject("AnimalHealthRepository")
    animalHealthRepository: IAnimalHealthRepository
  ) {
    this.animalHealthRepository = animalHealthRepository;
  }

  async execute() {
    const animalHealths = await this.animalHealthRepository.list();
    return animalHealths;
  }
}
