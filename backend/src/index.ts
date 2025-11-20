import "reflect-metadata";
import dataSource from "./config/db";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import ChallengeResolver from "./resolvers/ChallengeResolver";
import UserResolver from "./resolvers/UserResolver";
import EcogestureResolver from "./resolvers/EcogestureResolver";
import * as jwt from "jsonwebtoken";
import { authChecker } from "./lib/helpers/authChecker";
import { UserProfile } from "./types/Context";

import dotenv from "dotenv";
dotenv.config();

const port = Number(process.env.API_PORT);

async function startServer() {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [UserResolver, EcogestureResolver, ChallengeResolver],
    validate: true,
    authChecker,
  });
  const apolloServer = new ApolloServer({ schema });
  const { url } = await startStandaloneServer(apolloServer, {
    listen: { port },
    context: async ({ req, res }) => {
      let user: string | jwt.JwtPayload | null = null;

      const match = req.headers.cookie?.match(/eco-auth=([^;]+)/);
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
