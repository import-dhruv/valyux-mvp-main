import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "dist/**",
      "build/**",
      "*.config.js",
      "*.config.mjs",
      "public/**",
      ".gemini/**",
    ],
  },
  ...compat.config({
    extends: ["next/core-web-vitals"],
    rules: {
      // Disable rules that are too strict for development
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { 
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_" 
      }],
      "react/no-unescaped-entities": "warn",
      "@next/next/no-img-element": "warn",
      // Enforce consistent code style
      "prefer-const": "error",
      "no-var": "error",
    },
  }),
];

export default eslintConfig;
