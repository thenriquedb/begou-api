import { Router } from "express";

import { CreateRoleController } from "@modules/accounts/useCase/CreateRole";

const createRoleController = new CreateRoleController();

const accountsRoutes = Router();

accountsRoutes.post("/role", createRoleController.handle);

export { accountsRoutes };
