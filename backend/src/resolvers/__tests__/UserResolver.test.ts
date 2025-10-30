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

describe("UserResolver - Integration Tests with Real PostgreSQL", () => {
  let container: StartedPostgreSqlContainer;
  let dataSource: DataSource;
  let resolver: UserResolver;
  let mockContext: Context;
  const OLD_ENV = process.env;

  beforeAll(async () => {
    // 1. Démarrer un conteneur Docker PostgreSQL
    console.log("Starting PostgreSQL container...");
    container = await new PostgreSqlContainer("postgres:16-alpine")
      .withDatabase("test_ecochallenges")
      .withUsername("test_user")
      .withPassword("test_password")
      .withExposedPorts(5432)
      .start();

    console.log("PostgreSQL container started!");

    // 2. Créer la connexion TypeORM
    dataSource = new DataSource({
      type: "postgres",
      host: container.getHost(),
      port: container.getPort(),
      username: container.getUsername(),
      password: container.getPassword(),
      database: container.getDatabase(),
      entities: [User],
      synchronize: true, // Crée automatiquement les tables
      logging: false,
      dropSchema: true, // Nettoie le schéma à chaque fois
    });

    await dataSource.initialize();
    console.log("TypeORM initialized!");

    // 3. Configuration de l'environnement
    process.env = { ...OLD_ENV, JWT_SECRET: "test-integration-secret-key" };

    // 4. Mock du contexte
    mockContext = {
      res: {
        setHeader: jest.fn(),
      },
    } as unknown as Context;

    resolver = new UserResolver();
  }, 60000); // Timeout de 60 secondes pour le démarrage du conteneur

  afterAll(async () => {
    // Nettoyer tout
    if (dataSource && dataSource.isInitialized) {
      await dataSource.destroy();
    }
    if (container) {
      await container.stop();
    }
    process.env = OLD_ENV;
  });

  beforeEach(async () => {
    // Nettoyer les données entre chaque test
    await dataSource.getRepository(User).clear();
    (mockContext.res.setHeader as jest.Mock).mockClear();
  });

  describe("signup", () => {
    it("should create a real user in PostgreSQL with hashed password", async () => {
      // Arrange
      const signupData = {
        email: "integration@test.com",
        password: "mySecurePassword123",
      };

      // Act
      const result = await resolver.signup(signupData, mockContext);

      // Assert
      const parsedResult = JSON.parse(result);
      expect(parsedResult.email).toBe("integration@test.com");
      expect(parsedResult.username).toBe("integration");
      expect(parsedResult.roles).toEqual([Role.USER]);

      // Vérifier que l'utilisateur existe vraiment dans la DB
      const userInDb = await User.findOne({
        where: { email: "integration@test.com" },
      });

      expect(userInDb).toBeDefined();
      expect(userInDb!.id).toBeDefined();
      expect(userInDb!.email).toBe("integration@test.com");
      expect(userInDb!.username).toBe("integration");
      expect(userInDb!.roles).toEqual([Role.USER]);

      // Vérifier le hachage Argon2
      expect(userInDb!.hashedPassword).toBeDefined();
      expect(userInDb!.hashedPassword).not.toBe("mySecurePassword123");
      expect(userInDb!.hashedPassword).toMatch(/^\$argon2id\$/);

      // Vérifier que le cookie a été défini
      expect(mockContext.res.setHeader).toHaveBeenCalledTimes(1);
      expect(mockContext.res.setHeader).toHaveBeenCalledWith(
        "Set-Cookie",
        expect.stringContaining("tgc-auth=")
      );
    });

    it("should fail with duplicate email (unique constraint)", async () => {
      // Arrange
      const signupData = {
        email: "duplicate@test.com",
        password: "password123",
      };

      // Act - Créer le premier utilisateur
      await resolver.signup(signupData, mockContext);

      // Assert - Tenter de créer un doublon
      await expect(resolver.signup(signupData, mockContext)).rejects.toThrow();
    });

    it("should extract username correctly from complex emails", async () => {
      // Arrange
      const signupData = {
        email: "john.doe+test@example.co.uk",
        password: "password123",
      };

      // Act
      const result = await resolver.signup(signupData, mockContext);

      // Assert
      const parsedResult = JSON.parse(result);
      expect(parsedResult.username).toBe("john.doe+test");

      const userInDb = await User.findOne({
        where: { email: signupData.email },
      });
      expect(userInDb!.username).toBe("john.doe+test");
    });
  });
});
