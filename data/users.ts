import { env } from '../config/env';

export const users = {
  standard: env.users.standard,

  lockedOut:
    env.users.lockedOut,

  problem:
    env.users.problem,

  performanceGlitch:
    env.users.performanceGlitch,

  errorUser:
    env.users.errorUser,

  visualUser:
    env.users.visualUser,

  invalid:
    env.users.invalid,
};