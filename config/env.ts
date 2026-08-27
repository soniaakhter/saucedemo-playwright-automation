import dotenv from 'dotenv';

dotenv.config();

function getRequiredEnv(
  key: string
): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(
      `Missing required environment variable: ${key}`
    );
  }

  return value;
}

export const env = {
  baseUrl: getRequiredEnv(
    'BASE_URL'
  ),

  users: {
    standard: {
      username: getRequiredEnv(
        'STANDARD_USERNAME'
      ),

      password: getRequiredEnv(
        'STANDARD_PASSWORD'
      ),
    },

    lockedOut: {
      username: getRequiredEnv(
        'LOCKED_OUT_USERNAME'
      ),

      password: getRequiredEnv(
        'STANDARD_PASSWORD'
      ),
    },

    problem: {
      username: getRequiredEnv(
        'PROBLEM_USERNAME'
      ),

      password: getRequiredEnv(
        'STANDARD_PASSWORD'
      ),
    },

    performanceGlitch: {
      username: getRequiredEnv(
        'PERFORMANCE_GLITCH_USERNAME'
      ),

      password: getRequiredEnv(
        'STANDARD_PASSWORD'
      ),
    },

    errorUser: {
      username: getRequiredEnv(
        'ERROR_USERNAME'
      ),

      password: getRequiredEnv(
        'STANDARD_PASSWORD'
      ),
    },

    visualUser: {
      username: getRequiredEnv(
        'VISUAL_USERNAME'
      ),

      password: getRequiredEnv(
        'STANDARD_PASSWORD'
      ),
    },

    invalid: {
      username: getRequiredEnv(
        'INVALID_USERNAME'
      ),

      password: getRequiredEnv(
        'INVALID_PASSWORD'
      ),
    },
  },
};