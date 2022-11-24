import { inject, injectable } from "tsyringe";

import { IAnimalRepository } from "@modules/animals/repositories/IAnimalRepository";

interface IRequest {
  animal_id: string;
}

@injectable()
export class GetAnimalUseCase {
  private animalRepository: IAnimalRepository;

  constructor(
    @inject("AnimalRepository")
    animalRepository: IAnimalRepository
  ) {
    this.animalRepository = animalRepository;
  }

  async execute({ animal_id }: IRequest) {
    const animal = await this.animalRepository.findById(animal_id);
    return animal;
  }
}
