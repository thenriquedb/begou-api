import { AnimalPersonality } from "@modules/animals/entities/AnimalPersonality";

export interface ICreateAnimalPersonalityDTO {
  name: string;
  description: string;
}

export interface IAnimalPersonalityRepository {
  create: (data: ICreateAnimalPersonalityDTO) => Promise<void>;
  findByName: (name: string) => Promise<AnimalPersonality>;
  list: () => Promise<AnimalPersonality[]>;
}
