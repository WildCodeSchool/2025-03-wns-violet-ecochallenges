import { computeTotal } from "./operationTest";
import { describe, it, expect } from "vitest";

describe("computeTotal", () => {
  it("should compute the total of two numbers", () => {
    // Arrange
    const num1 = 5;
    const num2 = 10;
    // Act
    const result = computeTotal(num1, num2);
    // Asserts
    expect(result).toBe(15);
  });
});
