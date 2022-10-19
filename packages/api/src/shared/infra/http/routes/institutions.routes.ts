import { Router } from "express";

import { GetInstituitionController } from "@modules/institutions/useCases/GetInstituition";
import { CreateInstituitionController } from "@modules/institutions/useCases/CreateInstituition";
import { CreateInstituitionAddressController } from "@modules/institutions/useCases/CreateInstituitionAddress";
import { GetInstituitionAddressController } from "@modules/institutions/useCases/GetInstituitionAddress";
import { CreateInstituitionAssociateController } from "@modules/institutions/useCases/CreateInstituitionAssociate";
import { AssociateRole } from "@modules/institutions/enums/AssociateRole";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { canBe } from "../middlewares/canBe";

const createInstituitionAddressController =
  new CreateInstituitionAddressController();
const getInstituitionAddressController = new GetInstituitionAddressController();
const createInstituitionController = new CreateInstituitionController();
const getInstituitionController = new GetInstituitionController();
const createInstituitionAssociateController =
  new CreateInstituitionAssociateController();

const institutionsRoutes = Router();

institutionsRoutes.use(ensureAuthenticated);

institutionsRoutes.post("/", createInstituitionController.handle);

institutionsRoutes.get("/:institution_id", getInstituitionController.handle);

institutionsRoutes.post(
  "/:institution_id/address",
  canBe([AssociateRole.FOUNDER]),
  createInstituitionAddressController.handle
);
institutionsRoutes.post(
  "/:institution_id/associates",
  canBe([AssociateRole.FOUNDER]),
  createInstituitionAssociateController.handle
);

institutionsRoutes.get(
  "/:institution_id/address",
  canBe([AssociateRole.FOUNDER, AssociateRole.ASSOCIATE]),
  getInstituitionAddressController.handle
);

export { institutionsRoutes };
