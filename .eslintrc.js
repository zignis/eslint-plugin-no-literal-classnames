module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prefer-snakecase"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  /* eslint-disable prefer-snakecase/prefer-snakecase */
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "prefer-snakecase/prefer-snakecase": [
      "error",
      "always",
      {
        allowPascalCase: true,
      },
    ],
  },
  /* eslint-disable prefer-snakecase/prefer-snakecase */
};
