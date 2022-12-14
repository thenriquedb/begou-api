import "reflect-metadata";
import "dotenv/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";

import { MainSeeder } from "../seeds/Main.seeder";

const basePath = `${__dirname}/../../../../..`;

const options: DataSourceOptions & SeederOptions = {
  type: "sqlite",
  database: "./src/db/sqlite/database.sqlite",
  entities: [`${basePath}/**/entities/*.{ts,js}`],
  migrations: [`${basePath}/**/migrations/*.{ts,js}`],
  seeds: [MainSeeder],
};

export const AppDataSource = new DataSource(options);
