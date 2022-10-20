import { AnimalHealth } from "@modules/animals/entities/AnimalHealth";
import { AnimalPersonality } from "@modules/animals/entities/AnimalPersonality";
import { AnimalSize } from "@modules/animals/entities/AnimalSize";
import { Specie } from "@modules/animals/entities/Specie";
import { StageOfLife } from "@modules/animals/entities/StageOfLife";
import { AnimalGenre } from "@modules/animals/enums/Genre";
import { Institution } from "@modules/institutions/entities/Institution";

export interface ICreateAnimalDTO {
  name: string;
  description?: string;
  genre: AnimalGenre;
  healths: AnimalHealth[];
  institution: Institution;
  stage_of_life: StageOfLife;
  personalities: AnimalPersonality[];
  size: AnimalSize;
  specie: Specie;
}
