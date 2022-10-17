import { City } from "../entities/City";

export interface ICreateCityDTO {
  zipCode: string;
  name: string;
}

export interface ICityRepository {
  create: (data: ICreateCityDTO) => Promise<void>;
  findByZipCode: (zipCode: string) => Promise<City>;
  findByName: (name: string) => Promise<City>;
}
