module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended"
    ],

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
        "no-empty": 0,
        "react/prop-types": 0
    },
    ignorePatterns: [
        "src/assets/**/*",
        "src/component/MaterialsTransaction",
        "src/component/TransactionsTable/",
        "src/pages/CustomerInvoices",
        "src/pages/Dashboard",
        "src/pages/Delivery",
        "src/pages/Storage",
        "src/pages/Vechicles/**/*",
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
    ],
    settings: {
        react: {
            version: "detect"
        }
    }
};
