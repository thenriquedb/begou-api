import { Router } from "express";

import { GetInstituitionController } from "@modules/institutions/useCases/GetInstituition";
import { CreateInstituitionController } from "@modules/institutions/useCases/CreateInstituition";
import { CreateInstituitionAddressController } from "@modules/institutions/useCases/CreateInstituitionAddress";
import { GetAddressByIdController } from "@modules/institutions/useCases/GetInstituitionAddress";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const createInstituitionAddressController =
  new CreateInstituitionAddressController();
const getAddressByIdController = new GetAddressByIdController();
const createInstituitionController = new CreateInstituitionController();
const getInstituitionController = new GetInstituitionController();

const institutionsRoutes = Router();

institutionsRoutes.use(ensureAuthenticated);
institutionsRoutes.post("/", createInstituitionController.handle);
institutionsRoutes.get("/:instituition_id", getInstituitionController.handle);
institutionsRoutes.post(
  "/:instituition_id/address",
  createInstituitionAddressController.handle
);

institutionsRoutes.get(
  "/:instituition_id/address",
  getAddressByIdController.handle
);

export { institutionsRoutes };
