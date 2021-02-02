module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "prettier",
        "prettier/react",
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: ["react", "react-hooks", "import"],
    rules: {
        "react/prop-types": "off",
        "no-console": "warn",
        "react/react-in-jsx-scope": "off",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": 1,
        "no-unused-vars": "warn",
    },
    globals: {
        React: "writable",
    },
    settings: {
        react: {
            version: "detect",
        },
    },
}
