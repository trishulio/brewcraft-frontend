module.exports = {
    env: {
        browser: true,
        "jest": true
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:cypress/recommended"
    ],
    parser: "@babel/eslint-parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2020,
        sourceType: "module",
        babelOptions: {
            presets: ["@babel/preset-react"]
         },
    },
    plugins: [
        "react",
        "react-hooks"
    ],
    rules: {
        "no-empty": 0,
        "react/prop-types": 0
    },
    ignorePatterns: [
        "cypress/plugins",
        "cypress/support",
        "src/assets",
        "src/component/MaterialsTransaction",
        "src/component/TransactionsTable",
        "src/pages/CustomerInvoices",
        "src/pages/Dashboard",
        "src/pages/Delivery",
        "src/pages/Storage",
        "src/pages/Vechicles",
        "src/store/Currency",
        "src/store/Customers",
        "src/store/Driver",
        "src/store/Equipment",
        "src/store/ExpenseCategory",
        "src/store/Shipments",
        "src/store/Storages",
        "src/store/Tax",
        "src/store/Vechicles",
        "src/serviceWorker.js"
    ],
    settings: {
        react: {
            version: "detect"
        }
    }
};
