module.exports = {
  env: {
    browser: true,
    es2021: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'eslint:recommended', 'plugin:vue/vue3-recommended','prettier'],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/no-absolute-path': 'off',
    'import/no-extraneous-dependencies': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/html-self-closing': 'off',
    // "consistent-return":"off",  // 返回类型一致性
    'no-console': 'off',
    'no-plusplus':'off',
    'no-bitwise':'off',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state', 'config'],
      },
    ],
  },
};
