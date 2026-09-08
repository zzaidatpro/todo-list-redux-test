import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    // Utiliser 127.0.0.1 au lieu de localhost pour éviter les blocages de résolution DNS sous Linux
    baseURL: 'http://127.0.0.1:5173',
    trace: 'on-first-retry',
  },
  webServer: {
    // Commande pour démarrer Vite en écoutant sur 0.0.0.0
    command: 'npx vite --host 0.0.0.0 --port 5173',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000, // Laisse 2 minutes au serveur pour démarrer dans CircleCI
  },
});