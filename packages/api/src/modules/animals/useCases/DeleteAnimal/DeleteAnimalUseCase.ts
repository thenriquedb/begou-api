import { inject, injectable } from "tsyringe";

import { IAnimalRepository } from "@modules/animals/repositories/IAnimalRepository";
import { BadRequestError } from "@shared/errors/BadRequestError";

interface IRequest {
  animal_id: string;
}

@injectable()
export class DeleteAnimalUseCase {
  private animalRepository: IAnimalRepository;

  constructor(
    @inject("AnimalRepository")
    animalRepository: IAnimalRepository
  ) {
    this.animalRepository = animalRepository;
  }

  async execute(data: IRequest) {
    const { animal_id } = data;

    const animalExists = await this.animalRepository.findById(animal_id);

    if (!animalExists) {
      throw new BadRequestError("Animal does not exists");
    }

    await this.animalRepository.deleteById(animal_id);
  }
}
