import { container } from "tsyringe";

import { IAnimalSizesRepository } from "@modules/animals/repositories/IAnimalSizeRepository";
import { IAnimalPersonalityRepository } from "@modules/animals/repositories/IAnimalPersonalityRepository";
import { IAnimalHealthRepository } from "@modules/animals/repositories/IAnimalHealthRepository";
import { AnimalSizesRepository } from "@modules/animals/repositories/implementations/AnimalSizesRepository";
import { AnimalPersonalityRepository } from "@modules/animals/repositories/implementations/AnimalPersonalityRepository";
import { AnimalHealthRepository } from "@modules/animals/repositories/implementations/AnimalHealthRepository";

container.registerSingleton<IAnimalSizesRepository>(
  "AnimalSizesRepository",
  AnimalSizesRepository
);

container.registerSingleton<IAnimalPersonalityRepository>(
  "AnimalPersonalityRepository",
  AnimalPersonalityRepository
);

container.registerSingleton<IAnimalHealthRepository>(
  "AnimalHealthRepository",
  AnimalHealthRepository
);
