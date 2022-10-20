import { Router } from "express";

import { GetInstitutionController } from "@modules/institutions/useCases/GetInstitution";
import { ListInstitutionsController } from "@modules/institutions/useCases/ListInstitutions";
import { CreateInstitutionController } from "@modules/institutions/useCases/CreateInstitution";
import { CreateInstitutionAddressController } from "@modules/institutions/useCases/CreateInstitutionAddress";
import { GetInstitutionAddressController } from "@modules/institutions/useCases/GetInstitutionAddress";
import { CreateInstitutionAssociateController } from "@modules/institutions/useCases/CreateInstitutionAssociate";
import { CreateAnimalController } from "@modules/animals/useCases/CreateAnimal";
import { GetAnimalController } from "@modules/animals/useCases/GetAnimal";
import { ListAnimalsByInstitutionController } from "@modules/animals/useCases/ListAnimalsByInstitution";
import { AssociateRole } from "@modules/institutions/enums/AssociateRole";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { canBe } from "../middlewares/canBe";

const createAnimalController = new CreateAnimalController();
const getAnimalController = new GetAnimalController();
const createInstitutionAddressController =
  new CreateInstitutionAddressController();
const getInstitutionAddressController = new GetInstitutionAddressController();
const createInstitutionController = new CreateInstitutionController();
const getInstitutionController = new GetInstitutionController();
const createInstitutionAssociateController =
  new CreateInstitutionAssociateController();
const listAnimalsByInstitutionController =
  new ListAnimalsByInstitutionController();
const listInstitutionsController = new ListInstitutionsController();

const institutionsRoutes = Router();

institutionsRoutes.use(ensureAuthenticated);

institutionsRoutes.post("/", createInstitutionController.handle);
institutionsRoutes.get("/", listInstitutionsController.handle);

institutionsRoutes.get("/:institution_id", getInstitutionController.handle);

institutionsRoutes.post(
  "/:institution_id/address",
  canBe([AssociateRole.FOUNDER]),
  createInstitutionAddressController.handle
);

institutionsRoutes.post(
  "/:institution_id/associates",
  canBe([AssociateRole.FOUNDER]),
  createInstitutionAssociateController.handle
);

institutionsRoutes.post(
  "/:institution_id/animals",
  canBe([AssociateRole.FOUNDER]),
  createAnimalController.handle
);
institutionsRoutes.get(
  "/:institution_id/animals",
  listAnimalsByInstitutionController.handle
);

institutionsRoutes.get(
  "/:institution_id/animals/:animal_id",
  getAnimalController.handle
);

institutionsRoutes.get(
  "/:institution_id/address",
  canBe([AssociateRole.FOUNDER, AssociateRole.VOLUNTARY]),
  getInstitutionAddressController.handle
);

export { institutionsRoutes };
