# no-literal-classnames/no-literal-classnames

_This rule is included in `plugin:no-literal-classnames/recommended` preset._

## Rule Details

This rule disallows the use of string literals as classnames for React components.

Examples of **incorrect** code:

```jsx
/*eslint no-literal-classnames: "error"*/

<div className={'someClass'} />

<Component className={cx('a', 'b')} />
```

Examples of **correct** code:

```jsx
/*eslint no-literal-classnames: "error"*/

<div className={someComputedClass} />

<Component className={cx(styles.a, styles.b)} />
```

## Options

### `whitelist`

- Type: `string[]`
- Default: `[]`

Array of string classnames to ignore.

```jsx
/*eslint no-literal-classnames: ["error", "always", { "whitelist": ["fooBar"] }]*/

// Valid
<div className={"fooBar"} />
```
