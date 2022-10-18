import { ICreateAnimalHealthDTO } from "@modules/animals/dtos/ICreateAnimalHealthDTO";
import { AnimalHealth } from "@modules/animals/entities/AnimalHealth";

export interface IAnimalHealthRepository {
  create: (data: ICreateAnimalHealthDTO) => Promise<void>;
  findByName: (name: string) => Promise<AnimalHealth>;
  list: () => Promise<AnimalHealth[]>;
}
