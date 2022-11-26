import "reflect-metadata";
import "dotenv/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";

import config from "@shared/config/database";

import { MainSeeder } from "../seeds/Main.seeder";

const basePath = `${__dirname}/../../../../..`;

const options: DataSourceOptions & SeederOptions = {
  type: "mysql",
  host: config.host,
  port: config.port,
  username: config.username,
  password: config.password,
  database: config.database,
  charset: "utf8_general_ci",
  entities: [`${basePath}/**/entities/*.{js,ts}`],
  migrations: [`${basePath}/**/migrations/*.{js,ts}`],
  seeds: [MainSeeder],
};

export const AppDataSource = new DataSource(options);
