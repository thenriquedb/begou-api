import { inject, injectable } from "tsyringe";

import { IAdoptionRequestRepository } from "@modules/adoptions/repositories/IAdoptionRequestRepository";

interface IRequest {
  animal_id: string;
}

@injectable()
export class ListAdoptionRequestFromAnimalUseCase {
  private adoptionRequestRepository: IAdoptionRequestRepository;

  constructor(
    @inject("AdoptionRequestRepository")
    adoptionRequestRepository: IAdoptionRequestRepository
  ) {
    this.adoptionRequestRepository = adoptionRequestRepository;
  }

  async execute(data: IRequest) {
    const { animal_id } = data;

    const adoptionRequests = await this.adoptionRequestRepository.listBy({
      animal_id,
    });

    return adoptionRequests;
  }
}
