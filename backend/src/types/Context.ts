import { IncomingMessage, ServerResponse } from "http";
import { Role } from "../entities/User";

export type UserToken = {
  id: number;
  roles: Role[];
};

export type Context = {
  req: IncomingMessage;
  res: ServerResponse;
  user?: UserToken;
};
