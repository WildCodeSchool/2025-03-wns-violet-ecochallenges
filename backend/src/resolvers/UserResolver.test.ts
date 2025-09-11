import { Role, User } from "../entities/User";
import { createUserProfile } from "../resolvers/UserResolver";

describe("createUserProfile", () => {
  it("should create a valid user token from user entity", () => {
    // Arrange
    const mockUser = {
      id: 1,
      email: "test@example.com",
      username: "test",
      roles: [Role.USER],
      hashedPassword: "hashedPassword123",
    } as User;

    // Act
    const result = createUserProfile(mockUser);
    // Asserts
    expect(result).toEqual({
      id: 1,
      roles: [Role.USER],
    });
  });
});
