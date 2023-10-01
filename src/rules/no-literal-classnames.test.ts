import { RuleTester } from "eslint";
import { no_literal_classnames } from "./no-literal-classnames";

const tester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  /* eslint-disable prefer-snakecase/prefer-snakecase */
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  /* eslint-enable prefer-snakecase/prefer-snakecase */
});

tester.run("no-literal-classnames", no_literal_classnames, {
  valid: [
    "<div className={someComputedClassname} />",
    "<div className={cx(someComputedClassname, otherComputedClassname)} />",
    "<div className={cx(someComputedClassname, someCondition && someValue)} />",
    "<div className={cx(someComputedClassname, someCondition ? someValue : altValue)} />",
    {
      code: "<div className={'someLiteralClassname'} />",
      options: ["always", { whitelist: ["someLiteralClassname"] }],
    },
  ],
  invalid: [
    {
      code: "<div className={'someLiteralClassname'} />",
      errors: [
        {
          message:
            "Classname must not be a string literal: `someLiteralClassname`",
        },
      ],
    },
    {
      code: "<div className={`some_${name}`} />",
      errors: [
        {
          message: "Classname must not be a string literal: `some_`",
        },
      ],
    },
    {
      code: "<div className={cx(a, 'b', c)} />",
      errors: [
        {
          message: "Classname must not be a string literal: `b`",
        },
      ],
    },
    {
      code: "<div className={cx(a, someCondition && 'b', c)} />",
      errors: [
        {
          message: "Classname must not be a string literal: `b`",
        },
      ],
    },
    {
      code: "<div className={cx(a, someCondition ? 'b' : d, c)} />",
      errors: [
        {
          message: "Classname must not be a string literal: `b`",
        },
      ],
    },
    {
      code: "<div className={cx(a, someCondition ? b : 'd', c)} />",
      errors: [
        {
          message: "Classname must not be a string literal: `d`",
        },
      ],
    },
    {
      code: "<div className={cx(a, someCondition ? 'b' : 'd', c)} />",
      errors: [
        {
          message: "Classname must not be a string literal: `b`",
        },
      ],
    },
  ],
});
