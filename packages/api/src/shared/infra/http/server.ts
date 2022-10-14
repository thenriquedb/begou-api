import express from "express";
import "express-async-errors";

import "reflect-metadata";
import { errorHandler } from "@shared/infra/http/middlewares/errorHandler";

import "../../container";
import "./typeorm/data-source";
import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(router);
app.use(errorHandler);

app.listen(3333, () => console.log("Server is running!"));
