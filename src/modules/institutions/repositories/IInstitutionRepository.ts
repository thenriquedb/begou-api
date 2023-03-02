import { Address } from "@modules/adresses/entities/Address";
import { ICreateInstitutionDTO } from "@modules/institutions/dtos/ICreateInstitutionDTO";
import { IFindInstitutionDTO } from "@modules/institutions/dtos/IFindInstitutionDTO";
import { Institution } from "@modules/institutions/infra/typeorm/entities/Institution";

export interface IInstitutionRepository {
  create: (data: ICreateInstitutionDTO) => Promise<void>;
  createAddress: (id: string, data: Partial<Address>) => Promise<void>;
  findById: (id: string) => Promise<Institution>;
  find: (params: IFindInstitutionDTO) => Promise<Institution[]>;
}
