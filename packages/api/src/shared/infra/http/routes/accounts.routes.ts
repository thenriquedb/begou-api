import { Router } from "express";

import { CreateUserController } from "@modules/accounts/useCases/CreateUser";
import { CreateRoleController } from "@modules/accounts/useCases/CreateRole";
import { ListRolesController } from "@modules/accounts/useCases/ListRoles";

const createRoleController = new CreateRoleController();
const listRolesController = new ListRolesController();
const createUserController = new CreateUserController();

const accountsRoutes = Router();

accountsRoutes.post("/user", createUserController.handle);
accountsRoutes.post("/role", createRoleController.handle);
accountsRoutes.get("/role", listRolesController.handle);

export { accountsRoutes };
