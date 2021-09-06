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
        "plugin:jsx-a11y/recommended",
        "prettier/@typescript-eslint",
        "prettier",
        "prettier/react",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: "module",
    },
    plugins: [
        "react",
        "@typescript-eslint",
        "import",
        "jsx-a11y",
        "react-hooks",
    ],
    rules: {
        "react/prop-types": "off",
        "no-console": "warn",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/ban-ts-ignore": "off",
        // needed for NextJS's jsx without react import
        "react/react-in-jsx-scope": "off",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": 1,
        "react/jsx-filename-extension": [
            1,
            { extensions: [".ts", ".tsx", ".js", ".jsx"] },
        ],
        "no-unused-vars": "warn",
    },
    settings: {
        react: {
            version: "detect",
        },
        "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx"],
        },
        "import/resolver": {
            typescript: {},
        },
    },
    globals: {
        React: "writable",
    },
}
