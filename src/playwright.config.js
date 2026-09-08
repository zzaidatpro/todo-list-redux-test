import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  retries: process.env.CI ? 2 : 0,

  use: {
    // Utiliser 127.0.0.1 au lieu de localhost pour éviter les problèmes de résolution DNS sous Linux/Docker
    baseURL: 'http://127.0.0.1:5173',
    trace: 'on-first-retry',
  },

  webServer: {
    // On ajoute --host 0.0.0.0 pour forcer Vite à écouter sur toutes les interfaces réseau
    command: 'npx vite --host 0.0.0.0 --port 5173',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});