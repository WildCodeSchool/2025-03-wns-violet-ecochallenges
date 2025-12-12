import { AuthChecker } from "type-graphql";
import { Role } from "../../entities/User";
import { UserPayload } from "../../types/Context";

export const authChecker: AuthChecker<{ user: UserPayload }, Role> = async (
  { context: { user } },
  neededRoles
) => {
  if (!user) return false;
  if (!neededRoles.length) return true;

  return neededRoles.some(user.roles.includes);
};
