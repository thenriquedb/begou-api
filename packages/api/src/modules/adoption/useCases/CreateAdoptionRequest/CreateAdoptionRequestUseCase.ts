import { inject, injectable } from "tsyringe";

import { IAnimalRepository } from "@modules/animals/repositories/IAnimalRepository";
import { IInstitutionRepository } from "@modules/institutions/repositories/IInstitutionRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUserRepository";
import { IAdoptionRequestRepository } from "@modules/adoption/repositories/IAdoptionRequestRepository";
import { BadRequestError } from "@shared/errors/BadRequestError";
import { IAdoptionStatusRepository } from "@modules/adoption/repositories/IAdoptionStatusRepository";
import { AdoptionStatusValue } from "@modules/adoption/enums/AdoptionStatusValue";
import { Animal } from "@modules/animals/entities/Animal";

interface IRequest {
  animal_id: string;
  user_id: string;
  institution_id: string;
}

@injectable()
export class CreateAdoptionRequestUseCase {
  private adoptionRequestRepository: IAdoptionRequestRepository;
  private animalRepository: IAnimalRepository;
  private adoptionStatusRepository: IAdoptionStatusRepository;
  private institutionRepository: IInstitutionRepository;
  private userRepository: IUsersRepository;

  constructor(
    @inject("AdoptionRequestRepository")
    adoptionRequestRepository: IAdoptionRequestRepository,
    @inject("AdoptionStatusRepository")
    adoptionStatusRepository: IAdoptionStatusRepository,
    @inject("AnimalRepository")
    animalRepository: IAnimalRepository,
    @inject("InstitutionRepository")
    institutionRepository: IInstitutionRepository,
    @inject("UsersRepository")
    userRepository: IUsersRepository
  ) {
    this.adoptionRequestRepository = adoptionRequestRepository;
    this.animalRepository = animalRepository;
    this.institutionRepository = institutionRepository;
    this.userRepository = userRepository;
    this.adoptionStatusRepository = adoptionStatusRepository;
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

  private async getUser(user_id: string) {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new BadRequestError("Invalid user id");
    }

    return user;
  }

  private async getAnimal(animal_id: string) {
    const animal = await this.animalRepository.findById(animal_id);

    if (!animal) {
      throw new BadRequestError("Invalid animal id");
    }

    await this.verifyIfAnimalIsAvailable(animal);

    return animal;
  }

  private async verifyIfAnimalIsAvailable(animal: Animal) {
    if (!animal.available) {
      throw new BadRequestError("animal is not available");
    }
  }

  private async getDefaultStatus() {
    const status = await this.adoptionStatusRepository.findByName(
      AdoptionStatusValue.PENDING
    );

    return status;
  }

  async execute(data: IRequest) {
    const { animal_id, user_id, institution_id } = data;

    const user = await this.getUser(user_id);
    const animal = await this.getAnimal(animal_id);
    const institution = await this.getInstitution(institution_id);
    const status = await this.getDefaultStatus();

    await this.adoptionRequestRepository.create({
      animal,
      institution,
      status,
      user,
    });
  }
}
