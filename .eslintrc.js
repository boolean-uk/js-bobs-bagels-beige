module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jasmine: true,
  },
  extends: ["standard", "prettier"],
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "no-undef": "off",
    "prettier/prettier": ["error"],
  },
};
