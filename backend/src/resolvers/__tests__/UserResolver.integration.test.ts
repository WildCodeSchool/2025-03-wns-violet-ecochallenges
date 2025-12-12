import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
} from "@jest/globals";
import { DataSource } from "typeorm";
import UserResolver from "../UserResolver";
import { User, Role } from "../../entities/User";
import { Context } from "../../types/Context";
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";

/**
 * UserResolver Integration Tests
 *
 * These tests verify the complete authentication system functionality
 * with a real PostgreSQL database in a Docker container.
 *
 * Coverage:
 * - Helper functions (createUserPayload, createJwt, setCookie)
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

describe("UserResolver - Integration Tests with PostgreSQL Container", () => {
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

  //clean between tests
  beforeEach(async () => {
    await dataSource.getRepository(User).clear();
    (mockContext.res.setHeader as jest.Mock).mockClear();
  });

  describe("signup", () => {
    it("should create a real user in PostgreSQL with hashed password", async () => {
      const signupData = {
        email: "integration@test.com",
        password: "MySecurePass123!",
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
      expect(userInDb!.hashedPassword).not.toBe("MySecurePass123!");
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
        password: "DuplicatePass123!",
      };

      await resolver.signup(signupData, mockContext);

      await expect(resolver.signup(signupData, mockContext)).rejects.toThrow();
    });

    it("should extract username correctly from complex emails", async () => {
      const signupData = {
        email: "john.doe+test@example.co.uk",
        password: "ComplexPass123!",
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

  describe("signup - Edge cases", () => {
    it("should reject empty email", async () => {
      const signupData = { email: "", password: "ValidPass123!" };

      await expect(resolver.signup(signupData, mockContext)).rejects.toThrow(
        "Format de l'email invalide"
      );
    });

    it("should reject empty password", async () => {
      const signupData = { email: "test@test.com", password: "" };

      await expect(resolver.signup(signupData, mockContext)).rejects.toThrow(
        "Le mot de passe doit faire au moins 8 caractères"
      );
    });

    it("should reject password without uppercase", async () => {
      const signupData = { email: "test@test.com", password: "password123!" };

      await expect(resolver.signup(signupData, mockContext)).rejects.toThrow(
        "Le mot de passe doit contenir au moins une majuscule"
      );
    });

    it("should reject password without lowercase", async () => {
      const signupData = { email: "test@test.com", password: "PASSWORD123!" };

      await expect(resolver.signup(signupData, mockContext)).rejects.toThrow(
        "Le mot de passe doit contenir au moins une minuscule"
      );
    });

    it("should reject password without number", async () => {
      const signupData = { email: "test@test.com", password: "Password!" };

      await expect(resolver.signup(signupData, mockContext)).rejects.toThrow(
        "Le mot de passe doit contenir au moins un chiffre"
      );
    });

    it("should reject password without special character", async () => {
      const signupData = { email: "test@test.com", password: "Password123" };

      await expect(resolver.signup(signupData, mockContext)).rejects.toThrow(
        "Le mot de passe doit contenir au moins un caractère spécial"
      );
    });

    it("should reject password with spaces", async () => {
      const signupData = { email: "test@test.com", password: "Pass word123!" };

      await expect(resolver.signup(signupData, mockContext)).rejects.toThrow(
        "Le mot de passe ne doit pas contenir d'espaces"
      );
    });

    it("should reject password shorter than 8 characters", async () => {
      const signupData = { email: "test@test.com", password: "Pass1!" };

      await expect(resolver.signup(signupData, mockContext)).rejects.toThrow(
        "Le mot de passe doit faire au moins 8 caractères"
      );
    });

    it("should handle special characters in email", async () => {
      const signupData = {
        email: "test+special@sub-domain.co.uk",
        password: "ValidPass123!",
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
  });

  describe("login", () => {
    beforeEach(async () => {
      await resolver.signup(
        {
          email: "logintest@test.com",
          password: "CorrectPassword123!",
        },
        mockContext
      );
      (mockContext.res.setHeader as jest.Mock).mockClear();
    });

    it("should login successfully with correct credentials", async () => {
      const loginData = {
        email: "logintest@test.com",
        password: "CorrectPassword123!",
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
        password: "WrongPassword123!",
      };

      await expect(resolver.login(loginData, mockContext)).rejects.toThrow(
        "Email ou mot de passe invalide."
      );

      expect(mockContext.res.setHeader).not.toHaveBeenCalled();
    });

    it("should fail with non-existent email", async () => {
      const loginData = {
        email: "nonexistent@test.com",
        password: "AnyPassword123!",
      };

      await expect(resolver.login(loginData, mockContext)).rejects.toThrow(
        "Email ou mot de passe invalide."
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
        { email: "user1@test.com", password: "ValidPass1!" },
        mockContext
      );
      await resolver.signup(
        { email: "user2@test.com", password: "ValidPass2!" },
        mockContext
      );
      await resolver.signup(
        { email: "user3@test.com", password: "ValidPass3!" },
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
