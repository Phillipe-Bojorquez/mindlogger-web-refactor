import { defineConfig, devices } from '@playwright/test';
import {runtimeConfig} from './tests/config'


export default defineConfig({
  testDir: './tests',
  // Run a lightweight global setup to generate a reusable storageState
  // without relying on a dedicated "setup" project test.
  globalSetup: 'tests/e2e/setup/global.setup.ts',
  // Clean up storage state artifacts after the run
  globalTeardown: 'tests/e2e/setup/global.teardown.ts',
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL,
    trace: 'on-first-retry', // Collect trace when retrying failed tests
    headless: true,
  },

  reporter: process.env.CI ? 'github' : 'list',

  projects: [
    {
      name: 'smoke',
      testMatch: 'smoke/**/*.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        storageState: runtimeConfig.storageState,
      }
    },
    {
      name: 'e2e',
      testMatch: 'e2e/**/*.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        storageState: runtimeConfig.storageState,
      }
    },
    {
      name: 'user',
      testMatch: 'user/**/*.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        storageState: runtimeConfig.storageState,
      }
    },

    //TODO: Enable other browsers when needed.
    //At the moment all browsers but Chrome fail.
    //
    // {
    //   // Project for Firefox browser
    //   name: 'firefox',
    //   testMatch: /.*\.spec\.ts/,
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     // Use prepared auth state.
    //     storageState: authFile,
    //   },
    //   dependencies: ['setup'],
    // },
    // // Project for Safari browser
    // {
    //   name: 'safari',
    //   testMatch: /.*\.spec\.ts/,
    //   use: {
    //     ...devices['Desktop Safari'],
    //     // Use prepared auth state.
    //     storageState: authFile,
    //   },
    //   dependencies: ['setup'],
    // },
  ],
});
