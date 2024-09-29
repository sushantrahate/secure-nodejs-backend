# Environment Variable Management in Node.js

Overview

This guide will help you setting up and validating environment variables using the [envalid](https://www.npmjs.com/package/envalid) package in a Node.js application. Reducing potential configuration errors across environments.

## Features from `envalid` Package

- Only valid variables are used in your application.
- The variables are correctly typed and have appropriate default values.
- The validated environment variables are read-only, preventing accidental modification at runtime.

## Additional feature

- Validating environment keys present in .env file but not defined in config.

## Dependencies

```bash
npm install dotenv envalid express
```

## Setting Up the Project

```bash
my-node-app/
├── .env.dev
├── .env.qa
├── package.json
├── src/
│   ├── config/
│   │   ├── env-config.ts  // Configuration file
│   │   └── env-schema.ts  // Schema for environment variables
│   └── app.ts
```

## Configuration file (env-config.ts)

- **Validation:** Uses the envalid package to validate environment variables against a predefined schema.
- **Missing Keys:** Check for missing environment keys in the .env file but defined in config.
- **Extra Keys validation:** Check for extra environment keys present in the .env file but not defined in config.

## Schema file (env-schema.ts)

- **Structure Definition:** Defines expected environment variable types and structures for clarity.
- **Prefix-Based Key Management:** The configuration file checks for extra or missing keys using a defined prefix.

If you liked it then please show your love by ⭐ the repo
