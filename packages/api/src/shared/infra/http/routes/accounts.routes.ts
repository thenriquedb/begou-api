import { Router } from "express";

import { CreateRoleController } from "@modules/accounts/useCases/CreateRole";
import { ListRolesController } from "@modules/accounts/useCases/ListRoles";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const createRoleController = new CreateRoleController();
const listRolesController = new ListRolesController();

const accountsRoutes = Router();

accountsRoutes.post("/role", ensureAuthenticated, createRoleController.handle);
accountsRoutes.get("/role", ensureAuthenticated, listRolesController.handle);

export { accountsRoutes };
