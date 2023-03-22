module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/recommended', '@vue/airbnb'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'no-unused-vars': ['off'],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // vue
    'vue/no-reserved-component-names': 0,
    'vue/multi-word-component-names': 0,
    'vue/no-side-effects-in-computed-properties': 0,
  },
};
