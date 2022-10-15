import { Router } from "express";

import { animalsRoutes } from "./animals.routes";
import { accountsRoutes } from "./accounts.routes";

const router = Router();

router.use("/animals", animalsRoutes);
router.use("/accounts", accountsRoutes);

export { router };
