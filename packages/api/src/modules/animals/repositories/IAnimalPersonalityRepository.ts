import { ICreateAnimalPersonalityDTO } from "@modules/animals/dtos/ICreateAnimalPersonalityDTO";
import { AnimalPersonality } from "@modules/animals/entities/AnimalPersonality";

export interface IAnimalPersonalityRepository {
  create: (data: ICreateAnimalPersonalityDTO) => Promise<void>;
  findByName: (name: string) => Promise<AnimalPersonality>;
  list: () => Promise<AnimalPersonality[]>;
}
