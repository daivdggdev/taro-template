module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['taro', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'no-unused-vars': ['error', { varsIgnorePattern: 'Taro' }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx'] }],
    'react/sort-comp': 0,
    '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: 'Taro' }],
    '@typescript-eslint/member-delimiter-style': {
      multiline: {
        delimiter: 'none',
        requireLast: false
      },
      singleline: {
        delimiter: 'none',
        requireLast: false
      }
    },
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-empty-function': ['warn'],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-use-before-define': 0,
    'no-shadow': ['warn'],
    'prefer-const': ['warn'],
    'import/first': 0,
    'import/no-commonjs': 0
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    useJSXTextNode: true,
    project: './tsconfig.json'
  }
};
