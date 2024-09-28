// config.ts
import { str, port, bool } from 'envalid';

export const envSchema = {
  APP_NODE_ENV: str({
    default: 'dev',
    choices: ['dev', 'qa', 'staging', 'prod'],
  }),
  APP_PORT: port({ desc: 'The main server port' }),
  APP_LOG_LEVEL: str({ desc: 'Log level for the application' }),
  APP_DB_HOST: str({ desc: 'Database host' }),
  APP_DB_PORT: port({ desc: 'Database port' }),
  APP_API_KEY: str({
    desc: 'API key for external services',
    example: '123456',
  }),
  APP_ENABLE_FEATURE: bool({
    desc: 'Feature flag for enabling certain features',
  }),
};

export const PREFIX = 'APP_';
