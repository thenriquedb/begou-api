/* eslint-disable */
import { Router } from "express";

import { CreateAnimalSizeController } from "@modules/animals/useCases/CreateAnimalSize";
import { CreateAnimalPersonalityController } from "@modules/animals/useCases/CreateAnimalPersonality";
import { ListAnimalPersonalitiesController } from "@modules/animals/useCases/ListAnimalPersonalities";
import { ListAnimalSizesController } from "@modules/animals/useCases/ListAnimalSizes";
import { CreateAnimalHealthController } from "@modules/animals/useCases/CreateAnimalHealth";
import { ListAnimalHealthController } from "@modules/animals/useCases/ListAnimalHealth";

const createAnimalSizeController = new CreateAnimalSizeController();
const createAnimalPersonalityController = new CreateAnimalPersonalityController();
const listAnimalPersonalitiesController = new ListAnimalPersonalitiesController();
const listAnimalSizesController = new ListAnimalSizesController();
const createAnimalHealthController = new CreateAnimalHealthController();
const listAnimalHealthController = new ListAnimalHealthController()

const animalsRoutes = Router();

animalsRoutes.post("/size", createAnimalSizeController.handle);
animalsRoutes.get("/size", listAnimalSizesController.handle);
animalsRoutes.post("/personality", createAnimalPersonalityController.handle);
animalsRoutes.get("/personality", listAnimalPersonalitiesController.handle);
animalsRoutes.post("/health", createAnimalHealthController.handle);
animalsRoutes.get("/health", listAnimalHealthController.handle);

export { animalsRoutes };
