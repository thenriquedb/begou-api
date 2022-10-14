import { Router } from "express";

import { CreateAnimalSizeController } from "@modules/animals/useCases/CreateAnimalSize/CreateAnimalSizeController";
import { CreateAnimalPersonalityController } from "@modules/animals/useCases/CreateAnimalPersonality/CreateAnimalPersonalityController";
import { ListAnimalPersonalitiesController } from "@modules/animals/useCases/ListAnimalPersonalities/ListAnimalPersonalitiesController";
import { ListAnimalSizesController } from "@modules/animals/useCases/ListAnimalSizes/ListAnimalSizesController";

const createAnimalSizeController = new CreateAnimalSizeController();
const createAnimalPersonalityController =
  new CreateAnimalPersonalityController();
const listAnimalPersonalitiesController =
  new ListAnimalPersonalitiesController();
const listAnimalSizesController = new ListAnimalSizesController();

const animalsRoutes = Router();

animalsRoutes.post("/size", createAnimalSizeController.handle);
animalsRoutes.get("/size", listAnimalSizesController.handle);
animalsRoutes.post("/personality", createAnimalPersonalityController.handle);
animalsRoutes.get("/personality", listAnimalPersonalitiesController.handle);

export { animalsRoutes };
