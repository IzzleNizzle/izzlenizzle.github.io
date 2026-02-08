import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 8,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    browserName: 'chromium',
  },

  projects: [
    {
      name: 'Desktop',
      use: {
        viewport: { width: 1280, height: 800 },
      },
    },
    {
      name: 'Tablet',
      use: {
        viewport: { width: 767, height: 1024 },
      },
    },
    {
      name: 'Mobile',
      use: {
        viewport: { width: 375, height: 812 },
      },
    },
  ],

  webServer: {
    command: 'python3 -m http.server 3000',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});
