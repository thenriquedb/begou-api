import { DataSource } from "typeorm";
import "dotenv/config";
import "reflect-metadata";

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: "utf-8",
  entities: [`${__dirname}/../../../../**/entities/*.ts`],
  migrations: [`${__dirname}/../../../../**/migrations/*.ts`],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

export { AppDataSource };
