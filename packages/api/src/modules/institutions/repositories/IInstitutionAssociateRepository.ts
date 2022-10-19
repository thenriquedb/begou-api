import { FindOptionsWhere } from "typeorm";

import { ICreateInstitutionAssociateDTO } from "@modules/institutions/dtos/ICreateInstitutionAssociateDTO";
import { InstitutionAssociate } from "@modules/institutions/entities/InstitutionAssociate";

export interface IInstitutionAssociateRepository {
  create: (data: ICreateInstitutionAssociateDTO) => Promise<void>;
  findBy: (
    data: FindOptionsWhere<InstitutionAssociate>
  ) => Promise<InstitutionAssociate>;
}
