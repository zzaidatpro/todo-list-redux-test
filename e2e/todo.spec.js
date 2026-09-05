import { test, expect } from '@playwright/test';

test.describe('E2E - Application Todo', () => {
  test('Doit charger l application et ajouter une tâche', async ({ page }) => {
    // Remplacer '/' par l'URL complète de Vite
    await page.goto('http://localhost:5173');

    const input = page.getByRole('textbox');
    await expect(input).toBeVisible();

    await input.fill('Tâche E2E Playwright');
    
    const addButton = page.getByRole('button', { name: /ajouter/i });
    await addButton.click();

    await expect(page.getByText('Tâche E2E Playwright')).toBeVisible();
  });
});