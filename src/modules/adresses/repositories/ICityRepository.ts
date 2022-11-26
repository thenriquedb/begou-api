import { City } from "../entities/City";
import { ICreateCityDTO } from "../dtos/ICreateCityDTO";

export interface ICityRepository {
  create: (data: ICreateCityDTO) => Promise<void>;
  findByZipCode: (zipCode: string) => Promise<City>;
  findByName: (name: string) => Promise<City>;
}
