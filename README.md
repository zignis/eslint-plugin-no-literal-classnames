# eslint-plugin-no-literal-classnames

![GitHub Workflow Status](https://github.com/zignis/eslint-plugin-no-literal-classnames/actions/workflows/main.yaml/badge.svg)
![npm](https://img.shields.io/npm/v/eslint-plugin-no-literal-classnames?style=plastic)

Disallows the use of string literals as classnames for React components.

## Installation

### Yarn

```bash
yarn add -D eslint-plugin-no-literal-classnames
```

## Usage

Add `no-literal-classnames` to your list of plugins and extend the
recommended configuration.

```json
{
  "extends": "plugin:no-literal-classnames/recommended",
  "plugins": ["no-literal-classnames"]
}
```

## Rules

Available rules: https://github.com/zignis/eslint-plugin-no-literal-classnames/blob/main/docs/rules/no-literal-classnames.md
