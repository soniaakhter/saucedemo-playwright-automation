import {
  defineConfig,
  devices,
} from '@playwright/test';

import { env } from './config/env';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly:
    !!process.env.CI,

  retries:
    process.env.CI ? 2 : 0,

  workers:
    process.env.CI ? 1 : undefined,

  reporter: [
    ['list'],

    [
      'html',
      {
        open: 'never',
      },
    ],
  ],

  use: {
    baseURL: env.baseUrl,

    trace:
      'on-first-retry',

    screenshot:
      'only-on-failure',

    video:
      'retain-on-failure',

    actionTimeout:
      10_000,

    navigationTimeout:
      30_000,
  },

  projects: [
    {
      name: 'setup',

      testMatch:
        /.*\.auth\.ts/,
    },

    {
      name:
        'unauthenticated',

      testMatch: [
        /auth\/login\.spec\.ts/,

        /negative\/login-negative\.spec\.ts/,

        /negative\/problem-user\.spec\.ts/,

        /negative\/performance-user\.spec\.ts/,
      ],

      use: {
        ...devices[
          'Desktop Chrome'
        ],

        storageState: {
          cookies: [],
          origins: [],
        },
      },
    },

    {
      name: 'chromium',

      testIgnore: [
        /auth\/login\.spec\.ts/,

        /negative\/login-negative\.spec\.ts/,

        /negative\/problem-user\.spec\.ts/,

        /negative\/performance-user\.spec\.ts/,
      ],

      use: {
        ...devices[
          'Desktop Chrome'
        ],

        storageState:
          'auth/user.json',
      },

      dependencies: [
        'setup',
      ],
    },

    {
      name: 'firefox',

      use: {
        ...devices[
          'Desktop Firefox'
        ],

        storageState:
          'auth/user.json',
      },

      dependencies: [
        'setup',
      ],
    },

    {
      name: 'webkit',

      use: {
        ...devices[
          'Desktop Safari'
        ],

        storageState:
          'auth/user.json',
      },

      dependencies: [
        'setup',
      ],
    },
  ],
});