module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended',"turbo", "plugin:prettier/recommended"],
  plugins:['@typescript-eslint'],
  env:{
    es6:true
  },
  rules: {
    "react/jsx-key": "off",
    "prettier/prettier": "error",
    "no-empty-pattern": "warn"
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: "module",
  }
};
