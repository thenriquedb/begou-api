import { Address } from "../entities/Address";
import { ICreateAddressDTO } from "../dtos/ICreateAddressDTO";

export interface IAddressRepository {
  create: (data: ICreateAddressDTO) => Promise<void>;
  findById: (id: string) => Promise<Address>;
}
