import { Repository } from "typeorm";

import { AppDataSource } from "@shared/infra/http/typeorm/data-source";
import { InstitutionAssociate } from "@modules/institutions/entities/InstitutionAssociate";
import { ICreateInstitutionAssociateDTO } from "@modules/institutions/dtos/ICreateInstitutionAssociateDTO";

import { IInstitutionAssociateRepository } from "../IInstitutionAssociateRepository";

export class InstitutionAssociateRepository
  implements IInstitutionAssociateRepository {
  private repository: Repository<InstitutionAssociate>;

  constructor() {
    this.repository = AppDataSource.getRepository(InstitutionAssociate);
  }

  async create(data: ICreateInstitutionAssociateDTO) {
    const { associtate, institution } = data;

    const institutionAssociate = this.repository.create({
      institution,
      role: associtate.role,
      user: associtate.user,
    });

    await this.repository.save(institutionAssociate);
  }
}
