import { Role, User } from "../entities/User";
import { createUserToken } from "../resolvers/UserResolver";

describe('createUserToken', () => {
    it('should create a valid user token from user entity', () => {
      // Arrange
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        username: 'test',
        roles: [Role.USER],
        hashedPassword: 'hashedPassword123'
      } as User;

      // Act
      const result = createUserToken(mockUser);
      // Asserts
      expect(result).toEqual({
        id: 1,
        roles: [Role.USER]
      });
    });
})