import { Address } from "@modules/adresses/entities/Address";
import { ICreateInstitutionDTO } from "@modules/institutions/dtos/ICreateInstitutionDTO";
import { Institution } from "@modules/institutions/entities/Institution";

export interface IInstitutionRepository {
  create: (data: ICreateInstitutionDTO) => Promise<void>;
  createAddress: (id: string, data: Partial<Address>) => Promise<void>;
  findById: (id: string) => Promise<Institution>;
  list: () => Promise<Institution[]>;
}
