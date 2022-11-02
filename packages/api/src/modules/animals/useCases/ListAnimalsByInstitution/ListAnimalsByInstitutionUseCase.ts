import { inject, injectable } from "tsyringe";

import { IAnimalRepository } from "@modules/animals/repositories/IAnimalRepository";
import { IFindAnimalDTO } from "@modules/animals/dtos/IFindAnimalDTO";
import { IInstitutionRepository } from "@modules/institutions/repositories/IInstitutionRepository";
import { BadRequestError } from "@shared/core/errors/BadRequestError";

type IRequest = IFindAnimalDTO & { institution_id?: string };

@injectable()
export class ListAnimalsByInstitutionUseCase {
  private animalRepository: IAnimalRepository;
  private institutionRepository: IInstitutionRepository;

  constructor(
    @inject("AnimalRepository")
    animalRepository: IAnimalRepository,
    @inject("InstitutionRepository")
    institutionRepository: IInstitutionRepository
  ) {
    this.animalRepository = animalRepository;
    this.institutionRepository = institutionRepository;
  }

  async execute(data: IRequest) {
    const { institution_id, available = true, size_id, specie_id } = data;

    const institutionExist = await this.institutionRepository.findById(institution_id);

    if (!institutionExist) {
      throw new BadRequestError("Institution does not exist");
    }

    const animals = await this.animalRepository.listByInstitutionId(institution_id, {
      available,
      size_id,
      specie_id,
    });

    return animals;
  }
}
