import { Router } from "express";

import { CreateAddressController } from "@modules/adresses/useCases/CreateAddress";

const createAddressController = new CreateAddressController();

const institutionsRoutes = Router();

institutionsRoutes.post("/address", createAddressController.handle);

export { institutionsRoutes };
