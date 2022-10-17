import { Router } from "express";

import { animalsRoutes } from "./animals.routes";
import { accountsRoutes } from "./accounts.routes";
import { institutionsRoutes } from "./institutions.routes";

const router = Router();

router.use("/animals", animalsRoutes);
router.use("/accounts", accountsRoutes);
router.use("/institutions", institutionsRoutes);

export { router };
