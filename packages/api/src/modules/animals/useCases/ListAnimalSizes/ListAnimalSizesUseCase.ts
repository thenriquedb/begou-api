import { inject, injectable } from "tsyringe";

import { IAnimalSizesRepository } from "@modules/animals/repositories/IAnimalSizeRepository";

@injectable()
export class ListAnimalSizesUseCase {
  private animalSizesRepository: IAnimalSizesRepository;

  constructor(
    @inject("AnimalSizesRepository")
    animalSizesRepository: IAnimalSizesRepository
  ) {
    this.animalSizesRepository = animalSizesRepository;
  }

  async execute() {
    const animalSizes = await this.animalSizesRepository.list();
    return animalSizes;
  }
}
