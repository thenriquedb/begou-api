import { inject, injectable } from "tsyringe";

import { IAdoptionRequestRepository } from "@modules/adoptions/repositories/IAdoptionRequestRepository";

interface IRequest {
  adoption_id: string;
}

@injectable()
export class GetAdoptionRequestUseCase {
  private adoptionRequestRepository: IAdoptionRequestRepository;

  constructor(
    @inject("AdoptionRequestRepository")
    adoptionRequestRepository: IAdoptionRequestRepository
  ) {
    this.adoptionRequestRepository = adoptionRequestRepository;
  }

  async execute(data: IRequest) {
    const { adoption_id } = data;

    const adoptionRequest = await this.adoptionRequestRepository.findById(adoption_id);

    return adoptionRequest;
  }
}
