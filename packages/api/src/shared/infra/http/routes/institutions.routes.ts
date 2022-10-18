import { Router } from "express";

import { CreateAddressController } from "@modules/adresses/useCases/CreateAddress";
import { FindAddressByIdController } from "@modules/adresses/useCases/FindAddressById";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const createAddressController = new CreateAddressController();
const findAddressByIdController = new FindAddressByIdController();

const institutionsRoutes = Router();

institutionsRoutes.use(ensureAuthenticated);
institutionsRoutes.post("/address", createAddressController.handle);

institutionsRoutes.get(
  "/address/:address_id",
  findAddressByIdController.handle
);

export { institutionsRoutes };
