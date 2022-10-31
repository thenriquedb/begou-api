import { inject, injectable } from "tsyringe";

import { IAnimalRepository } from "@modules/animals/repositories/IAnimalRepository";
import { IInstitutionRepository } from "@modules/institutions/repositories/IInstitutionRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUserRepository";
import { IAdoptionRequestRepository } from "@modules/adoptions/repositories/IAdoptionRequestRepository";
import { BadRequestError } from "@shared/core/errors/BadRequestError";
import { IAdoptionStatusRepository } from "@modules/adoptions/repositories/IAdoptionStatusRepository";
import { AdoptionStatusValue } from "@modules/adoptions/enums/AdoptionStatusValue";
import { Animal } from "@modules/animals/entities/Animal";
import { ConflictError } from "@shared/core/errors/ConflictError";

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
    const institution = await this.institutionRepository.findById(institution_id);

    if (!institution) {
      throw new BadRequestError("Institution does not exist");
    }

    return institution;
  }

  private async getUser(user_id: string) {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new BadRequestError("User does not exist");
    }

    return user;
  }

  private async getAnimal(animal_id: string) {
    const animal = await this.animalRepository.findById(animal_id);

    if (!animal) {
      throw new BadRequestError("Animal does not exist");
    }

    await this.verifyIfAnimalIsAvailable(animal);

    return animal;
  }

  private async verifyIfAnimalIsAvailable(animal: Animal) {
    if (!animal.available) {
      throw new BadRequestError("Animal has already been adopted");
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

    const requestAlreadyExists = await this.adoptionRequestRepository.findBy({
      animal_id,
      user_id,
    });

    if (requestAlreadyExists) {
      throw new ConflictError("Adoption request already exists");
    }

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
