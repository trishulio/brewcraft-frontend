module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    // parser: babel-eslint,
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 13,
        sourceType: "module"
    },
    plugins: [
        "react"
    ],
    rules: {
        "no-empty": 0
    },
    ignorePatterns: [
        "src/assets/**/*",
        "src/store/Currency/**/*",
        "src/store/Customers/**/*",
        "src/store/Driver/**/*",
        "src/store/Equipment/**/*",
        "src/store/ExpenseCategory/**/*",
        "src/store/Shipments/**/*",
        "src/store/Storages/**/*",
        "src/store/Tax/**/*",
        "src/store/Vechicles/**/*",
        "src/serviceWorker.js"
    ]
};
