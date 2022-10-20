import { inject, injectable } from "tsyringe";

import { IAnimalHealthRepository } from "@modules/animals/repositories/IAnimalHealthRepository";
import { IAnimalPersonalityRepository } from "@modules/animals/repositories/IAnimalPersonalityRepository";
import { IAnimalSizesRepository } from "@modules/animals/repositories/IAnimalSizeRepository";
import { ISpecieRepository } from "@modules/animals/repositories/ISpecieRepository";
import { AnimalGenre } from "@modules/animals/enums/Genre";
import { IInstitutionRepository } from "@modules/institutions/repositories/IInstitutionRepository";
import { BadRequestError } from "@shared/errors/BadRequestError";
import { IAnimalRepository } from "@modules/animals/repositories/IAnimalRepository";

interface IRequest {
  name: string;
  description: string;
  institution_id: string;
  genre: string;
  specie_id: string;
  size_id: string;
  health_ids?: string[];
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
    @inject("AnimalRepository")
    animalRepository: IAnimalRepository
  ) {
    this.animalHealthRepository = animalHealthRepository;
    this.animalPersonalityRepository = animalPersonalityRepository;
    this.animalSizesRepository = animalSizesRepository;
    this.specieRepository = specieRepository;
    this.institutionRepository = institutionRepository;
    this.animalRepository = animalRepository;
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

  async execute(data: IRequest) {
    const {
      name,
      description,
      genre: genreRaw,
      size_id,
      institution_id,
      specie_id,
      health_ids = [],
      personality_ids = [],
    } = data;

    const genre = AnimalGenre[genreRaw];
    const genreIsValid = this.isValidGenre(genreRaw);

    if (!genreIsValid) {
      throw new BadRequestError("Invalid genre value");
    }

    const institution = await this.getInstitution(institution_id);
    const specie = await this.getSpecie(specie_id);
    const size = await this.animalSizesRepository.findById(size_id);
    const healths = await this.animalHealthRepository.findByIds(health_ids);
    const personalities = await this.animalPersonalityRepository.findByIds(
      personality_ids
    );

    await this.animalRepository.create({
      description,
      genre: genreRaw,
      healths,
      institution,
      name,
      personalities,
      size,
      specie,
    });
  }
}
