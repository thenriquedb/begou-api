import { inject, injectable } from "tsyringe";

import { IAdoptionRequestRepository } from "@modules/adoptions/repositories/IAdoptionRequestRepository";

interface IRequest {
  institution_id: string;
}

@injectable()
export class ListAdoptionRequestFromInstitutionUseCase {
  private adoptionRequestRepository: IAdoptionRequestRepository;

  constructor(
    @inject("AdoptionRequestRepository")
    adoptionRequestRepository: IAdoptionRequestRepository
  ) {
    this.adoptionRequestRepository = adoptionRequestRepository;
  }

  async execute(data: IRequest) {
    const { institution_id } = data;

    const adoptionRequests = await this.adoptionRequestRepository.listBy({
      institution_id,
    });

    return adoptionRequests;
  }
}
