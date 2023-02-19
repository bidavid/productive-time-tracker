module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: ['@nuxtjs/eslint-config-typescript'],
  rules: {
    'arrow-parens': ['error', 'always'],
    '@typescript-eslint/camelcase': 'off',
    camelcase: 'off',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'never'
      }
    ]
  }
}
