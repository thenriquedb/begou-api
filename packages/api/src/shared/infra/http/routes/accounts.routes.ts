import { Router } from "express";

import { CreateRoleController } from "@modules/accounts/useCases/CreateRole";
import { ListRolesController } from "@modules/accounts/useCases/ListRoles";

const createRoleController = new CreateRoleController();
const listRolesController = new ListRolesController();

const accountsRoutes = Router();

accountsRoutes.post("/role", createRoleController.handle);
accountsRoutes.get("/role", listRolesController.handle);

export { accountsRoutes };
