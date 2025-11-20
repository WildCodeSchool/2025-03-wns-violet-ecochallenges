import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Challenge } from "../entities/Challenge";


dotenv.config();
const { DB_HOST, DB_USER, DB_DATABASE, DB_PASSWORD } = process.env;

const dataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,

  entities: [User, Challenge],
  synchronize: true,
  logging: ["error", "query"],
});

export default dataSource;
