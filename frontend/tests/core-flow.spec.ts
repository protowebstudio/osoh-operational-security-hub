import { test, expect } from "@playwright/test";

test("core journey: register → login → dashboard access control", async ({ page }) => {
  const baseUrl = "http://localhost:5174";

  const email = `test_${Date.now()}@example.com`;
  const password = "TestPassword123!";

  await page.goto(`${baseUrl}/register`);

  await page.getByPlaceholder("Name").fill("Test User");
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Password").first().fill(password);
  await page.getByPlaceholder("Confirm Password").fill(password);

  await page.getByRole("button", { name: "Register" }).click();

  await page.waitForURL(/dashboard/);

  await page.getByRole("button", { name: "Logout" }).click();

  await page.goto(`${baseUrl}/dashboard`);
  await expect(page).toHaveURL(/login/);
});
