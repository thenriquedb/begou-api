import { DataSource, DataSourceOptions } from "typeorm";
import "reflect-metadata";
import "dotenv/config";

const options: DataSourceOptions = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: "utf8_general_ci",
  entities: [`${__dirname}/../../../../**/entities/*.ts`],
  migrations: [`${__dirname}/../../../../**/migrations/*.ts`],
};

export const AppDataSource = new DataSource(options);
