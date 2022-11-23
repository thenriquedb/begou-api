import { Router } from "express";
import swaggerUi from "swagger-ui-express";

import { animalsRoutes } from "./animals.routes";
import { accountsRoutes } from "./accounts.routes";
import { institutionsRoutes } from "./institutions.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { usersRoutes } from "./user.routes";
import swaggerDocument from "../swagger.json";

const router = Router();

router.use("/api-docs", swaggerUi.serve);
router.get(
  "/api-docs",
  swaggerUi.setup(swaggerDocument, {
    customCssUrl: "",
    swaggerOptions: {
      tagsSorter: "alpha",
      syntaxHighlight: {
        activate: true,
        theme: "monokai",
      },
    },
  })
);

router.use("/sessions", authenticateRoutes);
router.use("/users", usersRoutes);
router.use("/accounts", accountsRoutes);
router.use("/animals", animalsRoutes);
router.use("/institutions", institutionsRoutes);

export { router };
