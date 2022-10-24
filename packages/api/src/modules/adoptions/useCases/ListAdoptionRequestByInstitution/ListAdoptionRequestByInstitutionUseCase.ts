import { inject, injectable } from "tsyringe";

import { IAdoptionRequestRepository } from "@modules/adoptions/repositories/IAdoptionRequestRepository";
import { BadRequestError } from "@shared/errors/BadRequestError";

interface IRequest {
  institution_id: string;
}

@injectable()
export class ListAdoptionRequestByInstitutionUseCase {
  private adoptionRequestRepository: IAdoptionRequestRepository;

  constructor(
    @inject("AdoptionRequestRepository")
    adoptionRequestRepository: IAdoptionRequestRepository
  ) {
    this.adoptionRequestRepository = adoptionRequestRepository;
  }

  async execute(data: IRequest) {
    const { institution_id } = data;

    const adoptionRequest = await this.adoptionRequestRepository.listBy({
      institution_id,
    });

    return adoptionRequest;
  }
}
