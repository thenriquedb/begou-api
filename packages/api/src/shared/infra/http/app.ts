import "reflect-metadata";
import "express-async-errors";
import express from "express";

import { errorHandler } from "@shared/infra/http/middlewares/errorHandler";

import "../../config/dependency-injection";
import { AppDataSource } from "../db/typeorm/data-source";
import { router } from "./routes";

export class App {
  async run() {
    try {
      await AppDataSource.initialize();

      const app = express();

      app.use(express.json());
      app.use(router);
      app.use(errorHandler);

      app.listen(3333, () => console.log("Server is running!"));
    } catch (error) {
      console.error("Error during Data Source initialization", error);
    }
  }
}
