import * as dotenv from "dotenv";
import { DataSource } from "typeorm";

dotenv.config();
const { DB_HOST, DB_USER, DB_DATABASE, DB_PASSWORD } = process.env;

const dataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,

  entities: [],
  synchronize: true,
  logging: ["error", "query"],
});

export default dataSource;