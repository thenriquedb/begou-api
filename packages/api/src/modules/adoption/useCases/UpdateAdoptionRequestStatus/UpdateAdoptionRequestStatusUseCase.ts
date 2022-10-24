import { inject, injectable } from "tsyringe";

import { IAdoptionRequestRepository } from "@modules/adoption/repositories/IAdoptionRequestRepository";
import { BadRequestError } from "@shared/errors/BadRequestError";
import { IAdoptionStatusRepository } from "@modules/adoption/repositories/IAdoptionStatusRepository";
import { AdoptionStatusValue } from "@modules/adoption/enums/AdoptionStatusValue";
import { IAnimalRepository } from "@modules/animals/repositories/IAnimalRepository";
import { AdoptionRequest } from "@modules/adoption/entities/AdoptionRequest";

interface IRequest {
  adoption_id: string;
  status_id: string;
}

@injectable()
export class UpdateAdoptionRequestUseCase {
  private adoptionRequestRepository: IAdoptionRequestRepository;
  private adoptionStatusRepository: IAdoptionStatusRepository;
  private animalRepository: IAnimalRepository;

  constructor(
    @inject("AdoptionRequestRepository")
    adoptionRequestRepository: IAdoptionRequestRepository,
    @inject("AdoptionStatusRepository")
    adoptionStatusRepository: IAdoptionStatusRepository,
    @inject("AnimalRepository")
    animalRepository: IAnimalRepository
  ) {
    this.adoptionRequestRepository = adoptionRequestRepository;
    this.adoptionStatusRepository = adoptionStatusRepository;
    this.animalRepository = animalRepository;
  }

  private async updateAnimalAvailable(adoptionRequest: AdoptionRequest) {
    return this.animalRepository.update(adoptionRequest.animal.id, {
      available: true,
    });
  }

  async execute(data: IRequest) {
    const { adoption_id, status_id } = data;
    const adoptionRequest = await this.adoptionRequestRepository.findById(adoption_id);

    if (!adoptionRequest) {
      throw new BadRequestError("Adoption request does not exists");
    }

    const status = await this.adoptionStatusRepository.findById(status_id);

    if (!status || !status_id) {
      throw new BadRequestError("Invalid adoption status id");
    }

    if (status.name === AdoptionStatusValue.ACCEPTED) {
      await this.updateAnimalAvailable(adoptionRequest);
    }

    await this.adoptionRequestRepository.updateStatus(adoption_id, status);
  }
}
