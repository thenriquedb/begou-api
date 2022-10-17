import { Address } from "../entities/Address";

export interface ICreateAddressDTO {
  complement?: string;
  neighborhood: string;
  street: string;
  ufInitials: string;
  zipCode: string;
}

export interface IAddressRepository {
  create: (data: ICreateAddressDTO) => Promise<void>;
  findById: (id: string) => Promise<Address>;
}
