module.exports = {
  root: true,
  settings: {
    react: {
      version: `detect`,
    },
  },
  parser: `@typescript-eslint/parser`,
  plugins: [`react`, `react-hooks`, `prettier`],
  extends: [
    `plugin:@typescript-eslint/recommended`,
    `plugin:react/recommended`,
    `plugin:react-hooks/recommended`,
    `prettier`,
  ],
  rules: {
    'prettier/prettier': [
      2,
      {
        arrowParens: `always`,
        bracketSpacing: true,
        semi: false,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: `all`,
        printWidth: 120,
      },
    ],
    quotes: [1, `backtick`],
    'react/react-in-jsx-scope': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/explicit-module-boundary-types': 1,
    '@typescript-eslint/no-empty-interface': 0,
  },
}
