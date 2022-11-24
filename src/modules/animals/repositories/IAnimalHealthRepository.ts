import { ICreateAnimalHealthDTO } from "@modules/animals/dtos/ICreateAnimalHealthDTO";
import { AnimalHealth } from "@modules/animals/infra/typeorm/entities/AnimalHealth";

export interface IAnimalHealthRepository {
  create: (data: ICreateAnimalHealthDTO) => Promise<void>;
  findByName: (name: string) => Promise<AnimalHealth>;
  findById: (id: string) => Promise<AnimalHealth>;
  findByIds: (id: string[]) => Promise<AnimalHealth[]>;
  list: () => Promise<AnimalHealth[]>;
}
