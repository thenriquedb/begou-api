import { inject, injectable } from "tsyringe";

import { IAnimalRepository } from "@modules/animals/repositories/IAnimalRepository";
import { IFindAnimalDTO } from "@modules/animals/dtos/IFindAnimalDTO";

type IRequest = IFindAnimalDTO & { institution_id?: string };

@injectable()
export class ListAnimalsByInstitutionUseCase {
  private animalRepository: IAnimalRepository;

  constructor(
    @inject("AnimalRepository")
    animalRepository: IAnimalRepository
  ) {
    this.animalRepository = animalRepository;
  }

  async execute(data: IRequest) {
    const { institution_id, available, size_id, specie_id } = data;

    const animals = await this.animalRepository.findByInstitutionId(
      institution_id,
      { available, size_id, specie_id }
    );

    return animals;
  }
}
