import { ICreateAddressDTO } from "@modules/adresses/dtos/ICreateAddressDTO";
import { ICreateInstitutionDTO } from "@modules/institutions/dtos/ICreateInstitutionDTO";
import { Institution } from "@modules/institutions/entities/Institution";

export interface IInstitutionRepository {
  create: (data: ICreateInstitutionDTO) => Promise<void>;
  createAddress: (id: string, data: ICreateAddressDTO) => Promise<void>;
  findById: (id: string) => Promise<Institution>;
  list: () => Promise<Institution[]>;
}
