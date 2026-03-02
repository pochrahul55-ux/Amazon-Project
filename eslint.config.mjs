import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import globals from "globals";

export default [
  // 1. Base JS rules
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    ...js.configs.recommended,
    languageOptions: {
      globals: globals.browser
    },
    rules: {
      semi: ["error", "always"],       // enforce semicolons
      "no-unused-vars": ["error"],     // catch unused imports/variables
    }
  },

  // 2. React rules
  {
    files: ["**/*.{jsx,js}"],
    ...pluginReact.configs.flat.recommended
  },

  // 3. Jest test files
  {
    files: ["**/*.test.js", "**/*.spec.js"],
    ...js.configs.recommended,
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest
      }
    },
    rules: {
      semi: ["error", "always"],
      "no-unused-vars": ["error"]
    }
  }
];