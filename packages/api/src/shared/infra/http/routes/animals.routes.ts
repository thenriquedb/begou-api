import { Router } from "express";

import { CreateAnimalHealthController } from "@modules/animals/useCases/CreateAnimalHealth";
import { CreateAnimalPersonalityController } from "@modules/animals/useCases/CreateAnimalPersonality";
import { CreateAnimalSizeController } from "@modules/animals/useCases/CreateAnimalSize";
import { DeleteAnimalController } from "@modules/animals/useCases/DeleteAnimal";
import { GetAnimalController } from "@modules/animals/useCases/GetAnimal";
import { ListAdoptionRequestFromAnimalController } from "@modules/adoptions/useCases/ListAdoptionRequestFromAnimal";
import { ListAnimalHealthController } from "@modules/animals/useCases/ListAnimalHealth";
import { ListAnimalPersonalitiesController } from "@modules/animals/useCases/ListAnimalPersonalities";
import { ListAnimalSizesController } from "@modules/animals/useCases/ListAnimalSizes";
import { ListSpeciesController } from "@modules/animals/useCases/ListSpecies";
import { canBe } from "@shared/infra/http/middlewares/canBe";
import { AssociateRole } from "@modules/institutions/enums/AssociateRole";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const createAnimalHealthController = new CreateAnimalHealthController();
const createAnimalPersonalityController = new CreateAnimalPersonalityController();
const createAnimalSizeController = new CreateAnimalSizeController();
const getAnimalController = new GetAnimalController();
const listAnimalHealthController = new ListAnimalHealthController();
const listAnimalPersonalitiesController = new ListAnimalPersonalitiesController();
const listAnimalSizesController = new ListAnimalSizesController();
const listAdoptionRequestFromAnimal = new ListAdoptionRequestFromAnimalController();
const deleteAnimalController = new DeleteAnimalController();
const listSpeciesController = new ListSpeciesController();

const animalsRoutes = Router();

animalsRoutes.use(ensureAuthenticated);

animalsRoutes.get("/healths", listAnimalHealthController.handle);
animalsRoutes.get("/personalities", listAnimalPersonalitiesController.handle);
animalsRoutes.get("/sizes", listAnimalSizesController.handle);
animalsRoutes.get("/species", listSpeciesController.handle);
animalsRoutes.post("/healths", createAnimalHealthController.handle);
animalsRoutes.post("/personalities", createAnimalPersonalityController.handle);
animalsRoutes.post("/sizes", createAnimalSizeController.handle);
animalsRoutes.get("/:animal_id", getAnimalController.handle);
animalsRoutes.get("/:animal_id/adoptions", listAdoptionRequestFromAnimal.handle);
animalsRoutes.delete(
  "/:animal_id",
  canBe([AssociateRole.FOUNDER, AssociateRole.VOLUNTARY]),
  deleteAnimalController.handle
);

export { animalsRoutes };
