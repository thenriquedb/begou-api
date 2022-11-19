import { Router } from "express";

import { CreateRoleController } from "@modules/accounts/useCases/CreateRole";
import { ListRolesController } from "@modules/accounts/useCases/ListRoles";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const createRoleController = new CreateRoleController();
const listRolesController = new ListRolesController();

const accountsRoutes = Router();

accountsRoutes.post("/roles", ensureAuthenticated, createRoleController.handle);
accountsRoutes.get("/roles", ensureAuthenticated, listRolesController.handle);

export { accountsRoutes };
