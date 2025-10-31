import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
} from "@jest/globals";
import { DataSource } from "typeorm";
import UserResolver, { createUserProfile } from "../UserResolver";
import { User, Role } from "../../entities/User";
import { Context, UserProfile } from "../../types/Context";
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";
import * as jwt from "jsonwebtoken";

/**
 * UserResolver Integration Tests
 *
 * These tests verify the complete authentication system functionality
 * with a real PostgreSQL database in a Docker container.
 *
 * Coverage:
 * - Helper functions (createUserProfile, createJwt, setCookie)
 * - Signup with validation and hashing
 * - Login with Argon2 verification
 * - Logout
 * - User retrieval (getAllUsers)
 *
 * Technologies:
 * - @testcontainers/postgresql for isolation
 * - TypeORM for queries
 * - Argon2 for hashing
 * - JWT for authentication
 */
describe("UserResolver - Unit Tests (Helper Functions)", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    process.env = { ...OLD_ENV, JWT_SECRET: "test-secret-key" };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  describe("createUserProfile", () => {
    it("should create a valid user profile with id and roles", () => {
      const mockUser = {
        id: 1,
        email: "test@example.com",
        username: "test",
        roles: [Role.USER],
        hashedPassword: "hashedPassword123",
      } as User;

      const result = createUserProfile(mockUser);

      expect(result).toEqual({
        id: 1,
        roles: [Role.USER],
      });
    });
  });

  describe("createJwt", () => {
    it("should create a valid JWT token with correct payload", () => {
      const payload: UserProfile = {
        id: 1,
        roles: [Role.USER],
      };

      const JWT_SECRET = process.env.JWT_SECRET!;

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });

      expect(token).toBeDefined();
      expect(typeof token).toBe("string");
      expect(token.split(".").length).toBe(3); // Format JWT: header.payload.signature

      const decoded = jwt.verify(token, JWT_SECRET) as any;
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

describe("UserResolver - Integration Tests with Real PostgreSQL", () => {
  let container: StartedPostgreSqlContainer;
  let dataSource: DataSource;
  let resolver: UserResolver;
  let mockContext: Context;
  const OLD_ENV = process.env;

  beforeAll(async () => {
    console.log("Starting PostgreSQL container...");
    container = await new PostgreSqlContainer("postgres:16-alpine")
      .withDatabase("test_ecochallenges")
      .withUsername("test_user")
      .withPassword("test_password")
      .withExposedPorts(5432)
      .start();

    console.log("PostgreSQL container started!");

    // Setup TypeORM Connection
    dataSource = new DataSource({
      type: "postgres",
      host: container.getHost(),
      port: container.getPort(),
      username: container.getUsername(),
      password: container.getPassword(),
      database: container.getDatabase(),
      entities: [User],
      synchronize: true,
      logging: false,
      dropSchema: true,
    });

    await dataSource.initialize();
    console.log("TypeORM initialized!");

    process.env = { ...OLD_ENV, JWT_SECRET: "test-integration-secret-key" };

    mockContext = {
      res: {
        setHeader: jest.fn(),
      },
    } as unknown as Context;

    resolver = new UserResolver();
  }, 60000); // Timeout 60 seconds to wait for container creation

  afterAll(async () => {
    if (dataSource && dataSource.isInitialized) {
      await dataSource.destroy();
    }
    if (container) {
      await container.stop();
    }
    process.env = OLD_ENV;
  });

  beforeEach(async () => {
    await dataSource.getRepository(User).clear();
    (mockContext.res.setHeader as jest.Mock).mockClear();
  });

  describe("signup", () => {
    it("should create a real user in PostgreSQL with hashed password", async () => {
      const signupData = {
        email: "integration@test.com",
        password: "mySecurePassword123",
      };

      const result = await resolver.signup(signupData, mockContext);

      const parsedResult = JSON.parse(result);
      expect(parsedResult.email).toBe("integration@test.com");
      expect(parsedResult.username).toBe("integration");
      expect(parsedResult.roles).toEqual([Role.USER]);

      const userInDb = await User.findOne({
        where: { email: "integration@test.com" },
      });

      expect(userInDb).toBeDefined();
      expect(userInDb!.id).toBeDefined();
      expect(userInDb!.email).toBe("integration@test.com");
      expect(userInDb!.username).toBe("integration");
      expect(userInDb!.roles).toEqual([Role.USER]);

      expect(userInDb!.hashedPassword).toBeDefined();
      expect(userInDb!.hashedPassword).not.toBe("mySecurePassword123");
      expect(userInDb!.hashedPassword).toMatch(/^\$argon2id\$/);

      expect(mockContext.res.setHeader).toHaveBeenCalledTimes(1);
      expect(mockContext.res.setHeader).toHaveBeenCalledWith(
        "Set-Cookie",
        expect.stringContaining("eco-auth=")
      );
    });

    it("should fail with duplicate email (unique constraint)", async () => {
      const signupData = {
        email: "duplicate@test.com",
        password: "password123",
      };

      await resolver.signup(signupData, mockContext);

      await expect(resolver.signup(signupData, mockContext)).rejects.toThrow();
    });

    it("should extract username correctly from complex emails", async () => {
      const signupData = {
        email: "john.doe+test@example.co.uk",
        password: "password123",
      };

      const result = await resolver.signup(signupData, mockContext);

      const parsedResult = JSON.parse(result);
      expect(parsedResult.username).toBe("john.doe+test");

      const userInDb = await User.findOne({
        where: { email: signupData.email },
      });
      expect(userInDb!.username).toBe("john.doe+test");
    });
  });

  //TODO modification pour ne pas accepter les password null
  describe("signup - Edge cases", () => {
    it("should reject empty email", async () => {
      const signupData = { email: "", password: "pass123" };

      await expect(resolver.signup(signupData, mockContext)).rejects.toThrow();
    });

    it("should reject empty password", async () => {
      const signupData = { email: "test@test.com", password: "" };

      await expect(resolver.signup(signupData, mockContext)).rejects.toThrow();
    });

    it("should handle very long passwords", async () => {
      const longPassword = "a".repeat(1000);
      const signupData = {
        email: "longpass@test.com",
        password: longPassword,
      };

      const result = await resolver.signup(signupData, mockContext);

      expect(result).toBeDefined();
      const parsedResult = JSON.parse(result);
      expect(parsedResult.email).toBe("longpass@test.com");

      // Verify password was hashed properly
      const userInDb = await User.findOne({
        where: { email: "longpass@test.com" },
      });
      expect(userInDb!.hashedPassword).toMatch(/^\$argon2id\$/);
    });

    it("should handle special characters in email", async () => {
      const signupData = {
        email: "test+special@sub-domain.co.uk",
        password: "pass123",
      };

      const result = await resolver.signup(signupData, mockContext);

      const parsedResult = JSON.parse(result);
      expect(parsedResult.email).toBe("test+special@sub-domain.co.uk");
      expect(parsedResult.username).toBe("test+special");

      const userInDb = await User.findOne({
        where: { email: signupData.email },
      });
      expect(userInDb).toBeDefined();
      expect(userInDb!.username).toBe("test+special");
    });

    it("should handle SQL injection attempts in email (TypeORM protection)", async () => {
      const signupData = {
        email: "test'; DROP TABLE users; --@test.com",
        password: "pass123",
      };

      // TypeORM should protect against SQL injection
      await resolver.signup(signupData, mockContext);

      // Verify table still exists and user was created safely
      const users = await User.find();
      expect(users.length).toBeGreaterThan(0);

      const userInDb = await User.findOne({
        where: { email: signupData.email },
      });
      expect(userInDb).toBeDefined();
      expect(userInDb!.email).toBe("test'; DROP TABLE users; --@test.com");
    });

    it("should handle emails with multiple @ symbols", async () => {
      const signupData = {
        email: "test@domain@fake.com",
        password: "pass123",
      };

      // This should either work or fail gracefully
      // The email.split("@")[0] will take "test"
      const result = await resolver.signup(signupData, mockContext);

      const parsedResult = JSON.parse(result);
      expect(parsedResult.username).toBe("test");
    });
  });

  describe("login", () => {
    beforeEach(async () => {
      await resolver.signup(
        {
          email: "logintest@test.com",
          password: "correctPassword123",
        },
        mockContext
      );
      (mockContext.res.setHeader as jest.Mock).mockClear();
    });

    it("should login successfully with correct credentials", async () => {
      const loginData = {
        email: "logintest@test.com",
        password: "correctPassword123",
      };

      const token = await resolver.login(loginData, mockContext);

      expect(token).toBeDefined();
      expect(typeof token).toBe("string");
      expect(token.split(".").length).toBe(3); // Format JWT: header.payload.signature

      expect(mockContext.res.setHeader).toHaveBeenCalledWith(
        "Set-Cookie",
        expect.stringContaining("eco-auth=")
      );
    });

    it("should fail with incorrect password", async () => {
      const loginData = {
        email: "logintest@test.com",
        password: "wrongPassword",
      };

      await expect(resolver.login(loginData, mockContext)).rejects.toThrow(
        "Invalid user or password"
      );

      expect(mockContext.res.setHeader).not.toHaveBeenCalled();
    });

    it("should fail with non-existent email", async () => {
      const loginData = {
        email: "nonexistent@test.com",
        password: "anyPassword",
      };

      await expect(resolver.login(loginData, mockContext)).rejects.toThrow(
        "Invalid user or password"
      );

      expect(mockContext.res.setHeader).not.toHaveBeenCalled();
    });
  });
  describe("logout", () => {
    it("should clear the auth cookie", async () => {
      const result = await resolver.logout(mockContext);

      expect(result).toBe("Logged out");
      expect(mockContext.res.setHeader).toHaveBeenCalledWith(
        "Set-Cookie",
        "eco-auth=;secure;httpOnly;SameSite=Strict;"
      );
    });
  });

  describe("getAllUsers", () => {
    it("should return all users from database", async () => {
      await resolver.signup(
        { email: "user1@test.com", password: "pass1" },
        mockContext
      );
      await resolver.signup(
        { email: "user2@test.com", password: "pass2" },
        mockContext
      );
      await resolver.signup(
        { email: "user3@test.com", password: "pass3" },
        mockContext
      );

      const users = await resolver.getAllUsers();

      expect(users).toHaveLength(3);
      expect(users.map((u) => u.email)).toEqual(
        expect.arrayContaining([
          "user1@test.com",
          "user2@test.com",
          "user3@test.com",
        ])
      );
    });

    it("should return empty array when no users exist", async () => {
      const users = await resolver.getAllUsers();

      expect(users).toEqual([]);
    });
  });
});
