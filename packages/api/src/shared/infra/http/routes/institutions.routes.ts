import { Router } from "express";

// import { CreateAddressController } from "@modules/adresses/useCases/CreateAddress";
import { FindAddressByIdController } from "@modules/adresses/useCases/FindAddressById";
import { CreateInstituitionController } from "@modules/institutions/useCases/CreateInstituition";
import { CreateInstituitionAddressController } from "@modules/institutions/useCases/CreateInstituitionAddress";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const createInstituitionAddressController =
  new CreateInstituitionAddressController();
const findAddressByIdController = new FindAddressByIdController();
const createInstituitionController = new CreateInstituitionController();

const institutionsRoutes = Router();

institutionsRoutes.use(ensureAuthenticated);
institutionsRoutes.post("/", createInstituitionController.handle);

institutionsRoutes.post(
  "/:instituition_id/address",
  createInstituitionAddressController.handle
);

institutionsRoutes.get(
  "/:instituition_id/address",
  findAddressByIdController.handle
);

export { institutionsRoutes };
