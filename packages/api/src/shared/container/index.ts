import { container } from "tsyringe";

import { IAnimalSizesRepository } from "@modules/animals/repositories/IAnimalSizeRepository";
import { AnimalSizesRepository } from "@modules/animals/repositories/implementations/AnimalSizesRepository";
import { IAnimalPersonalitiesRepository } from "@modules/animals/repositories/IAnimalPersonalitiesRepository";
import { AnimalPersonalitiesRepository } from "@modules/animals/repositories/implementations/AnimalPersonalitiesRepository";

container.registerSingleton<IAnimalSizesRepository>(
  "AnimalSizesRepository",
  AnimalSizesRepository
);

container.registerSingleton<IAnimalPersonalitiesRepository>(
  "AnimalPersonalitiesRepository",
  AnimalPersonalitiesRepository
);
