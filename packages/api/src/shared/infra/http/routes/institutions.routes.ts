import { Router } from "express";

import { AssociateRole } from "@modules/institutions/enums/AssociateRole";
import { CreateAdoptionRequestController } from "@modules/adoptions/useCases/CreateAdoptionRequest";
import { CreateAnimalController } from "@modules/animals/useCases/CreateAnimal";
import { CreateInstitutionAddressController } from "@modules/institutions/useCases/CreateInstitutionAddress";
import { CreateInstitutionAssociateController } from "@modules/institutions/useCases/CreateInstitutionAssociate";
import { CreateInstitutionController } from "@modules/institutions/useCases/CreateInstitution";
import { GetAdoptionRequestController } from "@modules/adoptions/useCases/GetAdoptionRequest ";
import { GetAnimalController } from "@modules/animals/useCases/GetAnimal";
import { GetInstitutionController } from "@modules/institutions/useCases/GetInstitution";
import { ListAdoptionRequestFromInstitutionController } from "@modules/adoptions/useCases/ListAdoptionRequestFromInstitution";
import { ListAnimalsByInstitutionController } from "@modules/animals/useCases/ListAnimalsByInstitution";
import { ListInstitutionsController } from "@modules/institutions/useCases/ListInstitutions";
import { UpdateAdoptionRequestController } from "@modules/adoptions/useCases/UpdateAdoptionRequestStatus";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { canBe } from "../middlewares/canBe";

const createAdoptionRequestController = new CreateAdoptionRequestController();
const createAnimalController = new CreateAnimalController();
const createInstitutionAddressController = new CreateInstitutionAddressController();
const createInstitutionAssociateController = new CreateInstitutionAssociateController();
const createInstitutionController = new CreateInstitutionController();
const getAdoptionRequestController = new GetAdoptionRequestController();
const getAnimalController = new GetAnimalController();
const getInstitutionController = new GetInstitutionController();
const listAdoptionFromInstitutionController =
  new ListAdoptionRequestFromInstitutionController();
const listAnimalsByInstitutionController = new ListAnimalsByInstitutionController();
const listInstitutionsController = new ListInstitutionsController();
const updateAdoptionRequestController = new UpdateAdoptionRequestController();

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
  "/:institution_id/adoptions",
  createAdoptionRequestController.handle
);

institutionsRoutes.get(
  "/:institution_id/adoptions",
  listAdoptionFromInstitutionController.handle
);

institutionsRoutes.put(
  "/:institution_id/adoptions/:adoption_id/status",
  canBe([AssociateRole.FOUNDER, AssociateRole.VOLUNTARY]),
  updateAdoptionRequestController.handle
);

institutionsRoutes.get(
  "/:institution_id/adoptions/:adoption_id",
  getAdoptionRequestController.handle
);

institutionsRoutes.post(
  "/:institution_id/associates",
  canBe([AssociateRole.FOUNDER]),
  createInstitutionAssociateController.handle
);

institutionsRoutes.post(
  "/:institution_id/animals",
  canBe([AssociateRole.FOUNDER, AssociateRole.VOLUNTARY]),
  createAnimalController.handle
);
institutionsRoutes.get(
  "/:institution_id/animals",
  listAnimalsByInstitutionController.handle
);

institutionsRoutes.get("/:institution_id/animals/:animal_id", getAnimalController.handle);

export { institutionsRoutes };
