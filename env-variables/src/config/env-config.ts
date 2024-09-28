import { resolve } from 'path';
import * as dotenv from 'dotenv';
import { cleanEnv, EnvError } from 'envalid';
import { envSchema, PREFIX } from './env-schema';

// Load the correct .env file based on NODE_ENV
const NODE_ENV = process.env.NODE_ENV || 'dev';
if (NODE_ENV !== 'production') {
  const { error: loadError } = dotenv.config({
    path: resolve(`.env.${NODE_ENV}`),
  });
  if (loadError) {
    throw loadError; // Handle the error if the file loading fails
  }
  console.log(`Loaded environment: .env.${NODE_ENV}`);
}

// Function to validate and check for extra environment keys
function validateEnv() {
  try {
    // Define and validate environment variables using envalid
    const config = cleanEnv(process.env || {}, envSchema);

    checkExtraKeys(config);

    return config;
  } catch (error) {
    console.error(
      'Configuration validation failed with the following errors:',
      error instanceof EnvError ? error.message : `Unexpected error: ${error}`
    );
    process.exit(1);
  }
}

// Check for extra environment keys with the defined prefix
function checkExtraKeys(config: any) {
  const definedKeys = Object.keys(config);
  const envKeysWithPrefix = Object.keys(process.env).filter((key) =>
    key.startsWith(PREFIX)
  );

  const extraKeys = envKeysWithPrefix.filter(
    (key) => !definedKeys.includes(key)
  );

  if (extraKeys.length) {
    console.error(
      `\x1b[31mInvalid env: Keys present in the .env.${NODE_ENV} file but not defined in config: ${extraKeys.join(
        ', '
      )}\x1b[0m`
    );
    process.exit(1);
  }
}

// Validate environment and export the configuration
const config = validateEnv();
export = config;
