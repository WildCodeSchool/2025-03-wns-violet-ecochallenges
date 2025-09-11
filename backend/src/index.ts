import "reflect-metadata";
import dataSource from "./config/db";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import UserResolver from "./resolvers/UserResolver";
import * as jwt from "jsonwebtoken";
import { authChecker } from "./lib/helpers/authChecker";

import dotenv from "dotenv";
import { UserProfile } from "./types/Context";
dotenv.config();

const port = Number(process.env.API_PORT);

async function startServer() {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [UserResolver],
    authChecker,
  });
  const apolloServer = new ApolloServer({ schema });
  const { url } = await startStandaloneServer(apolloServer, {
    listen: { port },
    context: async ({ req, res }) => {
      let user: string | jwt.JwtPayload | null = null;

      const match = req.headers.cookie?.match(/tgc-auth=([^;]+)/);
      if (match && process.env.JWT_SECRET) {
        const token = match[1];
        user = jwt.verify(token, process.env.JWT_SECRET);
        if (typeof user === "string") user = null;
      }

      return { req, res, user: user as UserProfile };
    },
  });
  console.info("Server started on " + url);
}
startServer();
