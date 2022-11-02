import * as dotenv from "dotenv";
import findWorkspaceRoot from "find-yarn-workspace-root";

const workspaceRoot = findWorkspaceRoot(__dirname);
dotenv.config({ path: `${workspaceRoot}/.env` });

export default {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};
