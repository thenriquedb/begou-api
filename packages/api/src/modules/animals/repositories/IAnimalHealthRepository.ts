import { AnimalHealth } from "@modules/animals/entities/AnimalHealth";

export interface ICreateAnimalHealthDTO {
  name: string;
  description: string;
}

export interface IAnimalHealthRepository {
  create: (data: ICreateAnimalHealthDTO) => Promise<void>;
  findByName: (name: string) => Promise<AnimalHealth>;
  list: () => Promise<AnimalHealth[]>;
}
