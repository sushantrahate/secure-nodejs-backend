# ESLint & Prettier Setup with TypeScript

This project configures ESLint and Prettier to work together with TypeScript.
The setup follows best practices for linting, formatting, and code quality while
ensuring smooth integration into VSCode with automatic formatting on save.

Prerequisites

- Node.js v18.18.0 or above for ESLint 9 Support

## Linting

```bash
npm run lint
npm run lint:fix // Will check for linting errors and attempt to automatically fix
```

## Project Setup Steps if You Want to Set Up from Scratch

1.  Install TypeScript and necessary packages

```js
npm install typescript ts-node @types/node @tsconfig/node20 typescript-eslint/parser --save-dev
```

2. Create tsconfig.json and copy config from Repo.

3. Initialize ESLint configuration and plugins

```js
npm init @eslint/config@latest
// Select options according to your project

// Install additional Security Plugins
npm install eslint-plugin-security eslint-plugin-sonarjs --save-dev

// add ESLint Jest Plugins
npm install eslint-plugin-jest --save-dev
```

4. It will create eslint.config.mjs file, add additional config from this Repo.

5. Install Prettier and its ESLint configurations

```js
npm install prettier eslint-config-prettier eslint-plugin-prettier --save-dev
```

6. Create .prettierrc.json file add config from this Repo.

7. Configure VSCode Auto Formatting

In your project’s .vscode/settings.json file, configure auto-format on save:

```
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  }
}

```

8. VSCode Extensions

Install these VSCode extensions to ensure proper integration of ESLint and
Prettier

[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

[Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

9. Additional Resources

[Awesome ESLint](https://github.com/dustinspecker/awesome-eslint) for finding
useful ESLint plugins and configurations.
