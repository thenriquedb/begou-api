import { AnimalHealth } from "@modules/animals/infra/typeorm/entities/AnimalHealth";
import { AnimalPersonality } from "@modules/animals/infra/typeorm/entities/AnimalPersonality";
import { AnimalSize } from "@modules/animals/infra/typeorm/entities/AnimalSize";
import { Specie } from "@modules/animals/infra/typeorm/entities/Specie";
import { StageOfLife } from "@modules/animals/infra/typeorm/entities/StageOfLife";
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
