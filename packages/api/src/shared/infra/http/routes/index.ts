import { Router } from "express";

import { animalsRoutes } from "./animals.routes";
import { accountsRoutes } from "./accounts.routes";
import { institutionsRoutes } from "./institutions.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { usersRoutes } from "./user.routes";

const router = Router();

router.use("/sessions", authenticateRoutes);
router.use("/users", usersRoutes);
router.use("/accounts", accountsRoutes);
router.use("/animals", animalsRoutes);
router.use("/institutions", institutionsRoutes);

export { router };
