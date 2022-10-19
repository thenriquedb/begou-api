import { ICreateInstitutionAssociateDTO } from "@modules/institutions/dtos/ICreateInstitutionAssociateDTO";

export interface IInstitutionAssociateRepository {
  create: (data: ICreateInstitutionAssociateDTO) => Promise<void>;
}
