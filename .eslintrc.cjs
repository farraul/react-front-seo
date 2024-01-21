module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  parser: '@typescript-eslint/parser', //
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    // 'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['prettier', 'react-refresh', 'unused-imports'], // i delete 'react-refresh'
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-vars': 'off',

    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'unused-imports/no-unused-imports': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'prettier/prettier': 0,

    // quotes: ["error", "single"],
  },
};
