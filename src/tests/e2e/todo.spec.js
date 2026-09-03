import { test, expect } from '@playwright/test';

test('parcours utilisateur complet', async ({ page }) => {
  await page.goto('http://localhost:5173'); // Port Vite par défaut

  await page.fill('input', 'Acheter du café');
  await page.click('button:has-text("Ajouter")');

  await expect(page.locator('body')).toContainText('Acheter du café');
});