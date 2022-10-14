import { Router } from "express";

import { animalsRoutes } from "./animals.routes";

const router = Router();

router.use("/animals", animalsRoutes);

export { router };
