import { inject, injectable } from "tsyringe";

import { IInstitutionRepository } from "@modules/institutions/repositories/IInstitutionRepository";

interface IRequest {
  name: string;
  address_id: string;
}

@injectable()
export class CreateInstituitionUseCase {
  private instituitionRepository: IInstitutionRepository;

  constructor(
    @inject("InstitutionRepository")
    instituitionRepository: IInstitutionRepository
  ) {
    this.instituitionRepository = instituitionRepository;
  }

  async execute({ name, address_id }: IRequest) {
    await this.instituitionRepository.create({
      name,
      address_id,
    });
  }
}
