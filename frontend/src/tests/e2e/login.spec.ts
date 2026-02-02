import { test, expect } from "@playwright/test";

test.describe("Login Flow", () => {
  // Use a password that will be created only once
  const testPassword = "ValidPassword123!";

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should navigate to login page", async ({ page }) => {
    await page.goto("/signin");
    await expect(
      page.getByRole("heading", { name: "SE CONNECTER" }),
    ).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
  });

  test("should show link to signup page", async ({ page }) => {
    await page.goto("/signin");
    const signupLink = page.getByRole("link", {
      name: "Je n'ai pas encore de compte",
    });
    await expect(signupLink).toBeVisible();
  });

  test("should disable submit button when fields are empty", async ({
    page,
  }) => {
    await page.goto("/signin");
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeDisabled();
  });

  test("should enable submit button when fields are filled", async ({
    page,
  }) => {
    await page.goto("/signin");

    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="password"]', "password123");

    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeEnabled();
  });

  test("should create account and login successfully", async ({ page }) => {
    // Step 1 : Create an account with a unique email
    const uniqueEmail = `test-${Date.now()}@example.com`;

    await page.goto("/signup");
    await page.fill('input[name="email"]', uniqueEmail);
    await page.fill('input[name="password"]', testPassword);

    const signupButton = page.locator('button[type="submit"]');
    await expect(signupButton).toBeEnabled({ timeout: 5000 });
    await page.click('button[type="submit"]');

    await page.waitForTimeout(2000);

    // Step 2 : Go to login page
    await page.goto("/signin");

    // Step 3 : Login with the created credentials
    await page.fill('input[name="email"]', uniqueEmail);
    await page.fill('input[name="password"]', testPassword);
    await page.click('button[type="submit"]');

    // Wait for redirection to dashboard
    await expect(page).toHaveURL("/dashboard", { timeout: 10000 });
  });

  test("should show error message with invalid credentials", async ({
    page,
  }) => {
    await page.goto("/signin");

    await page.fill('input[name="email"]', "wrong@example.com");
    await page.fill('input[name="password"]', "WrongPassword123!");

    await page.click('button[type="submit"]');

    // Wait for the error message
    const errorMessage = page.locator("p.text-destructive");
    await expect(errorMessage).toBeVisible({ timeout: 5000 });
  });

  test("should prevent form submission with invalid email format", async ({
    page,
  }) => {
    await page.goto("/signin");

    const emailInput = page.locator('input[name="email"]');
    await emailInput.fill("invalid-email");
    await page.fill('input[name="password"]', "password123");

    await page.click('button[type="submit"]');

    // The browser should block the submission
    await expect(page).toHaveURL("/signin");
  });

  test("should navigate to signup page from login", async ({ page }) => {
    await page.goto("/signin");

    await page
      .getByRole("link", { name: "Je n'ai pas encore de compte" })
      .click();

    await expect(page).toHaveURL("/signup");
  });
});
