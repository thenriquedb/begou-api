import { AnimalHealth } from "@modules/animals/entities/AnimalHealth";
import { AnimalPersonality } from "@modules/animals/entities/AnimalPersonality";
import { AnimalSize } from "@modules/animals/entities/AnimalSize";
import { Specie } from "@modules/animals/entities/Specie";
import { AnimalGenre } from "@modules/animals/enums/Genre";
import { Institution } from "@modules/institutions/entities/Institution";

export interface ICreateAnimalDTO {
  name: string;
  description?: string;
  genre: AnimalGenre;
  healths: AnimalHealth[];
  institution: Institution;
  personalities: AnimalPersonality[];
  size: AnimalSize;
  specie: Specie;
}
