module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser : 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension' : [1, {extensions : [ ".js", ".jsx"]}],
    "react/destructuring-assignment": [1, "never"],
    "eqeqeq": [0],
    "react/state-in-constructor" : [0],
    "no-underscore-dangle": [0],
    "react/jsx-props-no-spreading" : [0],
    "no-alert" : [0],
    "react/no-did-update-set-state" : [0],
    "react/no-access-state-in-setstate" : [0],
    "react/jsx-key" : [0],
    "react/prop-types": [0],
    "camelcase": [0],
    "no-plusplus": [0],
    "react/sort-comp": [0],
    "react/no-direct-mutation-state": [0],
    "import/no-named-as-default": [0],
    "no-shadow": [0],
    "import/no-extraneous-dependencies": [0],
    "max-len": [0],
    "react/no-unescaped-entities": [0],
    "no-nested-ternary": [0],
    "array-callback-return": [0],
    "react/button-has-type": [0],
    "react/prefer-stateless-function": [0],
    "no-unused-vars": [0],
    "consistent-return": [0],

  },
};
