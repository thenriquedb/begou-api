import { inject, injectable } from "tsyringe";

import { IAnimalHealthRepository } from "@modules/animals/repositories/IAnimalHealthRepository";
import { IAnimalPersonalityRepository } from "@modules/animals/repositories/IAnimalPersonalityRepository";
import { IAnimalSizesRepository } from "@modules/animals/repositories/IAnimalSizeRepository";
import { ISpecieRepository } from "@modules/animals/repositories/ISpecieRepository";
import { AnimalGenre } from "@modules/animals/enums/Genre";
import { IInstitutionRepository } from "@modules/institutions/repositories/IInstitutionRepository";
import { BadRequestError } from "@shared/errors/BadRequestError";
import { IAnimalRepository } from "@modules/animals/repositories/IAnimalRepository";
import { IStageOfLifeRepository } from "@modules/animals/repositories/IStageOfLifeRepository";

interface IRequest {
  name: string;
  description: string;
  institution_id: string;
  genre: AnimalGenre;
  specie_id: string;
  size_id: string;
  health_ids?: string[];
  stage_of_life_id?: string;
  personality_ids?: string[];
}

@injectable()
export class CreateAnimalUseCase {
  private animalHealthRepository: IAnimalHealthRepository;
  private animalPersonalityRepository: IAnimalPersonalityRepository;
  private animalSizesRepository: IAnimalSizesRepository;
  private specieRepository: ISpecieRepository;
  private institutionRepository: IInstitutionRepository;
  private animalRepository: IAnimalRepository;
  private stageOfLifeRepository: IStageOfLifeRepository;

  constructor(
    @inject("AnimalHealthRepository")
    animalHealthRepository: IAnimalHealthRepository,
    @inject("AnimalPersonalityRepository")
    animalPersonalityRepository: IAnimalPersonalityRepository,
    @inject("AnimalSizesRepository")
    animalSizesRepository: IAnimalSizesRepository,
    @inject("SpecieRepository")
    specieRepository: ISpecieRepository,
    @inject("InstitutionRepository")
    institutionRepository: IInstitutionRepository,
    @inject("StageOfLifeRepository")
    stageOfLifeRepository: IStageOfLifeRepository,
    @inject("AnimalRepository")
    animalRepository: IAnimalRepository
  ) {
    this.animalHealthRepository = animalHealthRepository;
    this.animalPersonalityRepository = animalPersonalityRepository;
    this.animalSizesRepository = animalSizesRepository;
    this.specieRepository = specieRepository;
    this.institutionRepository = institutionRepository;
    this.animalRepository = animalRepository;
    this.stageOfLifeRepository = stageOfLifeRepository;
  }

  private async getInstitution(institution_id: string) {
    const institution = await this.institutionRepository.findById(
      institution_id
    );

    if (!institution) {
      throw new BadRequestError("Invalid institution id");
    }

    return institution;
  }

  private async getSpecie(specie_id: string) {
    const specie = this.specieRepository.findById(specie_id);

    if (!specie) {
      throw new BadRequestError("Invalid specie id");
    }

    return specie;
  }

  private isValidGenre(genreRaw: string) {
    return Object.values(AnimalGenre as any).includes(genreRaw);
  }

  private removeDuplicateIds(items: string[]) {
    return Array.from(new Set(items));
  }

  async execute(data: IRequest) {
    const {
      name,
      description,
      genre,
      size_id,
      institution_id,
      specie_id,
      health_ids = [],
      personality_ids = [],
      stage_of_life_id,
    } = data;

    const genreIsValid = this.isValidGenre(genre);

    if (!genreIsValid) {
      throw new BadRequestError("Invalid genre value");
    }

    const institution = await this.getInstitution(institution_id);
    const specie = await this.getSpecie(specie_id);
    const size = await this.animalSizesRepository.findById(size_id);

    const healths = await this.animalHealthRepository.findByIds(
      this.removeDuplicateIds(health_ids)
    );

    const personalities = await this.animalPersonalityRepository.findByIds(
      this.removeDuplicateIds(personality_ids)
    );

    const stageOfLife = await this.stageOfLifeRepository.findById(
      stage_of_life_id
    );

    await this.animalRepository.create({
      description,
      genre,
      stage_of_life: stageOfLife,
      healths,
      institution,
      name,
      personalities,
      size,
      specie,
    });
  }
}
