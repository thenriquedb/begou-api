import { ICreateAnimalPersonalityDTO } from "@modules/animals/dtos/ICreateAnimalPersonalityDTO";
import { AnimalPersonality } from "@modules/animals/infra/typeorm/entities/AnimalPersonality";

export interface IAnimalPersonalityRepository {
  create: (data: ICreateAnimalPersonalityDTO) => Promise<void>;
  findByName: (name: string) => Promise<AnimalPersonality>;
  findById: (id: string) => Promise<AnimalPersonality>;
  findByIds: (ids: string[]) => Promise<AnimalPersonality[]>;
  list: () => Promise<AnimalPersonality[]>;
}
