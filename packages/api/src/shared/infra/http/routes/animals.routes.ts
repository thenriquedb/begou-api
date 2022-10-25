import { Router } from "express";

import { CreateAnimalHealthController } from "@modules/animals/useCases/CreateAnimalHealth";
import { CreateAnimalPersonalityController } from "@modules/animals/useCases/CreateAnimalPersonality";
import { CreateAnimalSizeController } from "@modules/animals/useCases/CreateAnimalSize";
import { GetAnimalController } from "@modules/animals/useCases/GetAnimal";
import { ListAnimalHealthController } from "@modules/animals/useCases/ListAnimalHealth";
import { ListAnimalPersonalitiesController } from "@modules/animals/useCases/ListAnimalPersonalities";
import { ListAnimalSizesController } from "@modules/animals/useCases/ListAnimalSizes";
import { ListAdoptionRequestFromAnimalController } from "@modules/adoptions/useCases/ListAdoptionRequestFromAnimal";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const createAnimalHealthController = new CreateAnimalHealthController();
const createAnimalPersonalityController = new CreateAnimalPersonalityController();
const createAnimalSizeController = new CreateAnimalSizeController();
const getAnimalController = new GetAnimalController();
const listAnimalHealthController = new ListAnimalHealthController();
const listAnimalPersonalitiesController = new ListAnimalPersonalitiesController();
const listAnimalSizesController = new ListAnimalSizesController();
const listAdoptionRequestFromAnimal = new ListAdoptionRequestFromAnimalController();

const animalsRoutes = Router();

animalsRoutes.use(ensureAuthenticated);
animalsRoutes.post("/sizes", createAnimalSizeController.handle);
animalsRoutes.get("/sizes", listAnimalSizesController.handle);
animalsRoutes.post("/personalities", createAnimalPersonalityController.handle);
animalsRoutes.get("/personalities", listAnimalPersonalitiesController.handle);
animalsRoutes.post("/healths", createAnimalHealthController.handle);
animalsRoutes.get("/healths", listAnimalHealthController.handle);
animalsRoutes.get("/:animal_id", getAnimalController.handle);
animalsRoutes.get("/:animal_id/adoptions", listAdoptionRequestFromAnimal.handle);

export { animalsRoutes };
