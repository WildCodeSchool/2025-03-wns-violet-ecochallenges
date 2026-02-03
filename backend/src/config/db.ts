import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Challenge } from "../entities/Challenge";
import { Ecogesture } from "../entities/Ecogesture";
import { UserEcogesture } from "../entities/UserEcogesture";
import { UserChallenge } from "../entities/UserChallenge";

dotenv.config();
const { DB_HOST, DB_USER, DB_DATABASE, DB_PASSWORD } = process.env;

console.log("=================== DB_USER used:", DB_USER);

const dataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [User, Ecogesture, Challenge, UserEcogesture, UserChallenge],
  synchronize: true,
  logging: ["error", "query"],
});

export default dataSource;
