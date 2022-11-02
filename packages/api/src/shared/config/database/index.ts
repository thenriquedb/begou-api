import * as dotenv from "dotenv";

const root = `${__dirname}/../../../../../..`;
dotenv.config({ path: `${root}/.env` });

export default {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};
