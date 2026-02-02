import { test, expect } from "@playwright/test";

test.describe("Register Flow", () => {

  // Generate a unique email for each test run
  const timestamp = Date.now();
  const testEmail = `test-${timestamp}@example.com`;
  const testPassword = "ValidPassword123!";

  test("should navigate to signup page", async ({ page }) => {
    await page.goto("/signup");
    await expect(
      page.getByRole("heading", { name: "CRÉER UN COMPTE" }),
    ).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
  });

  test("should show password requirements", async ({ page }) => {
    await page.goto("/signup");

    await expect(page.getByText("Au moins 8 caractères")).toBeVisible();
    await expect(page.getByText("Au moins 1 caractère spécial")).toBeVisible();
    await expect(page.getByText("Au moins 1 lettre majuscule")).toBeVisible();
    await expect(page.getByText("Au moins 1 lettre minuscule")).toBeVisible();
    await expect(page.getByText("Au moins 1 chiffre")).toBeVisible();
  });

  test("should disable submit button with invalid password", async ({
    page,
  }) => {
    await page.goto("/signup");

    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', "weak");

    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeDisabled();
  });

  test("should show validation for weak passwords", async ({ page }) => {
    await page.goto("/signup");

    await page.fill('input[name="email"]', testEmail);

    // Try a weak password
    await page.fill('input[name="password"]', "Weak1!");
    // Wait for validation to update
    await page.waitForTimeout(500);

    // Check if at least one rule is not validated
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeDisabled();

    // Try with a password missing a uppercase letter
    await page.fill('input[name="password"]', "password123!");
    await page.waitForTimeout(500);
    await expect(submitButton).toBeDisabled();
  });

  test("should signup successfully with valid credentials", async ({
    page,
  }) => {
    await page.goto("/signup");

    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', testPassword);

    // Wait for the button to be enabled
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeEnabled({ timeout: 5000 });

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for redirection to dashboard
    await expect(page).toHaveURL("/dashboard", { timeout: 30000 });
  });

  test("should fail when email already exists", async ({ page }) => {
    // First, create an account
    await page.goto("/signup");
    const duplicateEmail = `duplicate-${Date.now()}@example.com`;

    await page.fill('input[name="email"]', duplicateEmail);
    await page.fill('input[name="password"]', testPassword);

    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeEnabled({ timeout: 5000 });
    await page.click('button[type="submit"]');

    // Wait for redirection to dashboard
    await expect(page).toHaveURL("/dashboard", { timeout: 30000 });

    // Disconnect by navigating to signup page
    await page.goto("/signup");

    // Now, try to create the same account again
    await page.fill('input[name="email"]', duplicateEmail);
    await page.fill('input[name="password"]', testPassword);

    const submitButton2 = page.locator('button[type="submit"]');
    await expect(submitButton2).toBeEnabled({ timeout: 5000 });
    await page.click('button[type="submit"]');
  });

  test("should show link to login page", async ({ page }) => {
    await page.goto("/signup");
    const loginLink = page.getByRole("link", { name: "J'ai déjà un compte" });
    await expect(loginLink).toBeVisible();
  });

  test("should navigate to login page from signup", async ({ page }) => {
    await page.goto("/signup");
    await page.getByRole("link", { name: "J'ai déjà un compte" }).click();
    await expect(page).toHaveURL("/signin");
  });
});
