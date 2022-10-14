import { container } from "tsyringe";

import { IAnimalSizesRepository } from "@modules/animals/repositories/IAnimalSizeRepository";
import { AnimalSizesRepository } from "@modules/animals/repositories/implementations/AnimalSizesRepository";

container.registerSingleton<IAnimalSizesRepository>(
  "AnimalSizesRepository",
  AnimalSizesRepository
);