import { inject, injectable } from "tsyringe";

import { IAnimalRepository } from "@modules/animals/repositories/IAnimalRepository";

interface IRequest {
  institution_id: string;
}

@injectable()
export class ListAnimalsByInstitutionUseCase {
  private animalRepository: IAnimalRepository;

  constructor(
    @inject("AnimalRepository")
    animalRepository: IAnimalRepository
  ) {
    this.animalRepository = animalRepository;
  }

  async execute({ institution_id }: IRequest) {
    const animals = await this.animalRepository.listByIdInstitutionId(
      institution_id
    );

    return animals;
  }
}
