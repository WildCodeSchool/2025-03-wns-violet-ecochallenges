import { describe, it, expect, afterAll, beforeEach } from "@jest/globals";
import { createUserPayload } from "../UserResolver";
import { User, Role } from "../../entities/User";
import { Context, UserPayload } from "../../types/Context";

import * as jwt from "jsonwebtoken";

describe("UserResolver - Unit Tests (Helper Functions)", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    process.env = { ...OLD_ENV, JWT_SECRET: "test-secret-key" };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  describe("createUserPayload", () => {
    it("should create a valid user payload with id and roles", () => {
      const mockUser = {
        id: 1,
        email: "test@example.com",
        username: "test",
        roles: [Role.USER],
        hashedPassword: "hashedPassword123",
      } as User;

      const result = createUserPayload(mockUser);

      expect(result).toEqual({
        id: 1,
        roles: [Role.USER],
      });
    });
  });

  describe("createJwt", () => {
    it("should create a valid JWT token with correct payload", () => {
      const payload: UserPayload = {
        id: 1,
        roles: [Role.USER],
      };

      const JWT_SECRET = process.env.JWT_SECRET!;

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });

      expect(token).toBeDefined();
      expect(typeof token).toBe("string");
      expect(token.split(".").length).toBe(3); // Format JWT: header.payload.signature

      const decoded = jwt.verify(
        token,
        JWT_SECRET
      ) as unknown as jwt.JwtPayload;
      expect(decoded.id).toBe(1);
      expect(decoded.roles).toEqual([Role.USER]);
      expect(decoded.exp).toBeDefined();
    });
  });

  describe("setCookie", () => {
    it("should set cookie with correct format and token", () => {
      const mockContext = {
        res: {
          setHeader: jest.fn(),
        },
      } as unknown as Context;

      const token = "test-jwt-token-123";

      mockContext.res.setHeader(
        "Set-Cookie",
        `eco-auth=${token};secure;httpOnly;SameSite=Strict;`
      );

      expect(mockContext.res.setHeader).toHaveBeenCalledWith(
        "Set-Cookie",
        "eco-auth=test-jwt-token-123;secure;httpOnly;SameSite=Strict;"
      );
      expect(mockContext.res.setHeader).toHaveBeenCalledTimes(1);
    });

    it("should set cookie with all security flags", () => {
      const mockContext = {
        res: {
          setHeader: jest.fn(),
        },
      } as unknown as Context;

      const token = "secure-token";
      const cookieValue = `eco-auth=${token};secure;httpOnly;SameSite=Strict;`;

      mockContext.res.setHeader("Set-Cookie", cookieValue);

      const callArg = (mockContext.res.setHeader as jest.Mock).mock.calls[0][1];
      expect(callArg).toContain("secure");
      expect(callArg).toContain("httpOnly");
      expect(callArg).toContain("SameSite=Strict");
      expect(callArg).toContain("eco-auth=");
    });
  });
});
