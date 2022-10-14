import { Router } from "express";

import { CreateAnimalSizeController } from "@modules/animals/useCases/CreateAnimalSize/CreateAnimalSizeController";

const createAnimalSizeController = new CreateAnimalSizeController();

const animalsRoutes = Router();

animalsRoutes.post("/", createAnimalSizeController.handle);

export { animalsRoutes };
