module.exports = {
  env: {
    commonjs: false,
    es6: true,
    node: true,
  },
  plugins: ["unused-imports"],
  extends: [
    "eslint:recommended",
    "react-app",
    "react-app/jest",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": "warn",
    "unused-imports/no-unused-imports": "error",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
