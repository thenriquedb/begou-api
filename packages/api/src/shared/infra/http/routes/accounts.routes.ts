import { Router } from "express";

import { CreateRoleController } from "@modules/accounts/useCase/CreateRole";
import { ListRolesController } from "@modules/accounts/useCase/ListRoles";

const createRoleController = new CreateRoleController();
const listRolesController = new ListRolesController();

const accountsRoutes = Router();

accountsRoutes.post("/role", createRoleController.handle);
accountsRoutes.get("/role", listRolesController.handle);

export { accountsRoutes };
