import "reflect-metadata";
import "dotenv/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";

import { MainSeeder } from "@shared/infra/db/typeorm/seeds/MainSeeder";

const options: DataSourceOptions & SeederOptions = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: "utf8_general_ci",
  entities: [`${__dirname}/../../../../**/entities/*.ts`],
  migrations: [`${__dirname}/../../../../**/migrations/*.ts`],
  seeds: [MainSeeder],
};

export const AppDataSource = new DataSource(options);
