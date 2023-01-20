module.exports = {
  extends: ["turbo", "prettier"],
  env:{
    es6:true
  },
  rules: {
    "react/jsx-key": "off",
  },
  parserOptions: {
    sourceType: "module",
  }
};
