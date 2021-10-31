module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "prettier/@typescript-eslint",
        "next/core-web-vitals",
        "prettier",
        "prettier/react",
        // TODO: Fix TypeScript Problems and then enable
        //"plugin:@typescript-eslint/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["@typescript-eslint"],
    rules: {
        "no-console": "warn",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/ban-ts-ignore": "off",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": 1,
        "react/jsx-filename-extension": [
            1,
            { extensions: [".ts", ".tsx", ".js", ".jsx"] },
        ],
        "no-unused-vars": "warn",
    },
    settings: {
        "import/resolver": {
            typescript: {},
        },
    },
    globals: {
        React: "writable",
        JSX: true,
    },
}
