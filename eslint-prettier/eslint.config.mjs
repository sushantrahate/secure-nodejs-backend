import globals from 'globals'; // Import global variables such as 'process', 'require', etc., commonly used in Node.js
import pluginJs from '@eslint/js'; // Provides recommended JavaScript rules from ESLint
import tseslint from 'typescript-eslint'; // Provides recommended TypeScript rules
import pluginPromise from 'eslint-plugin-promise'; // Enforces best practices for working with Promises
import jest from 'eslint-plugin-jest';
import eslintPluginSecurity from 'eslint-plugin-security'; // Import security plugin
import eslintPluginSonarjs from 'eslint-plugin-sonarjs'; // Import SonarJS plugin
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'; // Ensures Prettier formatting doesn't conflict with ESLint

export default [
  // Specify the file extensions this config should apply to
  { files: ['**/*.{js,mjs,cjs,ts}'] },

  // Ignore certain directories and files from being linted (e.g., build files, node_modules)
  {
    ignores: ['dist/', 'node_modules/', '__tests__/', '*.d.ts'],
  },

  // Configure language options such as globals and TypeScript project settings
  {
    languageOptions: {
      parserOptions: {
        projectService: true, // Allows ESLint to use TypeScript project settings
      },
      globals: globals.node, // Includes Node.js specific global variables
    },
  },

  // Use ESLint's recommended JavaScript rules
  pluginJs.configs.recommended,

  // Use TypeScript-ESLint's recommended rules and stylistic rules for consistent code style
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,

  // Plugin for better Promise handling and best practices
  pluginPromise,
  {
    files: ['__tests__/**/*.{js,ts,jsx,tsx}'], // Apply these rules to your test files
    ...jest.configs['flat/recommended'], // Extend recommended Jest ESLint rules
    rules: {
      ...jest.configs['flat/recommended'].rules,
      // Customize rules based on your preferences
      'jest/prefer-expect-assertions': 'off', // Disable the rule that enforces `expect.assertions()` in every test
    },
  },
  eslintPluginSecurity, // Add security plugin here
  eslintPluginSonarjs, // Add SonarJS plugin here

  // Prettier should come at the end to ensure formatting rules don't conflict with ESLint rules
  eslintPluginPrettierRecommended,

  {
    rules: {
      // Turn off forcing a return statement on functions that don't need it
      'consistent-return': 'off',

      // Allow omission of curly braces for single-line arrow functions
      'arrow-body-style': 'off',

      // Error if there are unused variables in TypeScript files
      '@typescript-eslint/no-unused-vars': 'error',

      // Prettier formatting errors should be flagged by ESLint
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto', // Let Prettier automatically handle line endings for different OS environments
        },
      ],

      // Prevent using variables or functions before they are defined
      'no-use-before-define': [
        'error',
        {
          functions: false, // Allow function hoisting (using a function before it is declared)
          classes: true, // Disallow class hoisting
          variables: true, // Disallow variable hoisting
        },
      ],

      // Disallow unused variables, but allow unused function arguments
      'no-unused-vars': [
        'error',
        {
          args: 'none',
        },
      ],

      // Disallow the use of `eval()` to prevent potential security risks
      'no-eval': 'error',

      // Disallow inline comments after code, which can reduce readability
      'no-inline-comments': 'warn',

      // Disallow unused expressions to prevent logical errors in code
      'no-unused-expressions': 'error',

      // Require explicit accessibility modifiers on class members (useful for TypeScript)
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'no-public', // Enforces `private` and `protected` access modifiers but allows implicit `public`
        },
      ],

      // Restrict importing external dependencies that are not listed in package.json
      'import/no-extraneous-dependencies': [
        'error',
        { devDependencies: false },
      ],

      // Encourage destructuring for object assignments but not arrays
      'prefer-destructuring': [
        'error',
        {
          object: true,
          array: false,
        },
      ],

      // Disallow importing the default export from modules (promotes named exports)
      'import/no-default-export': 'error',
    },
  },
];
