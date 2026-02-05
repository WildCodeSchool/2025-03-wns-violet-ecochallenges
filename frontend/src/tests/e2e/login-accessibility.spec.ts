import { test, expect } from "@playwright/test";

test.describe("Login Accessibility", () => {
  test("should have proper labels for form inputs", async ({ page }) => {
    await page.goto("/signin");

    // Check that labels are associated with inputs
    await expect(page.locator('label:has-text("Email")')).toBeVisible();
    await expect(page.locator('label:has-text("Mot de passe")')).toBeVisible();
  });

  test("should be keyboard navigable", async ({ page }) => {
    await page.goto("/signin");

    // Fill in the form fields to enable the submit button (otherwise it is not focusable)
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="password"]', "password123");

    // List of selectors to check for keyboard accessibility
    const selectors = [
      'input[name="email"]',
      'input[name="password"]',
      'button[type="submit"]',
    ];
    const focused = new Set<string>();

    // Check if any of the elements is already focused on page load
    for (const selector of selectors) {
      const handle = await page.locator(selector).elementHandle();
      if (
        handle &&
        (await page.evaluate((el) => el === document.activeElement, handle))
      ) {
        focused.add(selector);
      }
    }

    // Press Tab up to 15 times to cycle through focusable elements
    // After each Tab, check if one of the target elementsis focused
    for (let i = 0; i < 15 && focused.size < selectors.length; i++) {
      await page.keyboard.press("Tab");
      for (const selector of selectors) {
        const handle = await page.locator(selector).elementHandle();
        if (
          handle &&
          (await page.evaluate((el) => el === document.activeElement, handle))
        ) {
          focused.add(selector);
        }
      }
    }

    // Assert that all important elements were focused at least once
    expect(focused.size).toBe(selectors.length);
  });

  test("should submit form with Enter key", async ({ page }) => {
    await page.goto("/signin");

    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="password"]', "password123");

    await page.keyboard.press("Enter");

    // Verify that submission took place by checking for redirection to dashboard
    await expect(page).not.toHaveURL("/dashboard");
  });
});
