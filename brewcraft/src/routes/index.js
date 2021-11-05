import React from "react";
import { Redirect } from "react-router-dom";
import Dashboard from "../pages/Dashboard/dashboard";
import Brew from "../pages/Brew";
import Brews from "../pages/Brews";
import FinishedGood from "../pages/FinishedGood";
import FinishedGoods from "../pages/FinishedGoods";
import Ingredient from "../pages/Ingredient";
import Ingredients from "../pages/Ingredients";
import MaterialCategory from "../pages/MaterialCategory";
import MaterialCategories from "../pages/MaterialCategories";
import PackagingItem from "../pages/PackagingItem";
import Packaging from "../pages/Packaging";
import Products from "../pages/Products";
import Product from "../pages/Product";
import ProductCategories from "../pages/ProductCategories";
import ProductCategory from "../pages/ProductCategory";
import PurchaseInvoice from "../pages/PurchaseInvoice";
import PurchaseInvoices from "../pages/PurchaseInvoices";
import RawMaterials from "../pages/RawMaterials";
import Reports from "../pages/Reports/k50b";
import SalesCustomer from "../pages/Customers/Customers";
import SalesCustomers from "../pages/Customers/Customers";
import SalesReceipts from "../pages/CustomerInvoices/invoices";
import SalesReceipt from "../pages/CustomerInvoices/view-invoice";
import Sku from "../pages/Sku";
import Supplier from "../pages/Supplier";
import Suppliers from "../pages/Suppliers";
import SupplierContact from "../pages/SupplierContact";
import SupplierContacts from "../pages/SupplierContacts";
import Users from "../pages/Users";
import NotFound from "../pages/pages-404";

const publicRoutes = [
    { path: "/404", component: NotFound }
];

const authProtectedRoutes = [
    // Dashboard
    { path: "/dashboard", component: Dashboard },

    // Batches
    { path: "/brews/:id", component: Brew },
    { path: "/brews", component: Brews },

    // Inventory
    { path: "/inventory/raw-materials", component: RawMaterials },

    // Finished Goods
    { path: "/finished-goods/:id", component: FinishedGood },
    { path: "/finished-goods", component: FinishedGoods },

    // Product Categories
    { path: "/products/categories/:id", component: ProductCategory },
    { path: "/products/categories", component: ProductCategories },

    // Products
    { path: "/products/:id", component: Product },
    { path: "/sku", component: Sku },
    { path: "/products", component: Products },

    // Ingredients
    { path: "/materials/ingredients/:id", component: Ingredient },
    { path: "/materials/ingredients", component: Ingredients },

    // Packaging
    { path: "/materials/packaging/:id", component: PackagingItem },
    { path: "/materials/packaging", component: Packaging },

    // Material Categories
    { path: "/materials/categories/:id", component: MaterialCategory },
    { path: "/materials/categories", component: MaterialCategories },

    // Purchase Invoices
    { path: "/purchases/invoices/:id", component: PurchaseInvoice },
    { path: "/purchases/invoices", component: PurchaseInvoices },

    // Suppliers
    { path: "/suppliers/contacts/:id", component: SupplierContact },
    { path: "/suppliers/contacts", component: SupplierContacts },
    { path: "/suppliers/:id", component: Supplier },
    { path: "/suppliers", component: Suppliers },

    // Sales Receipts
    { path: "/sales/receipts/:id", component: SalesReceipt },
    { path: "/sales/receipts", component: SalesReceipts },

    // Customers
    { path: "/sales/customers/:id", component: SalesCustomer },
    { path: "/sales/customers", component: SalesCustomers },

    // Reports
    { path: "/reports", component: Reports },

    // Users
    { path: "/users", component: Users },

    // Default
    { path: "/", exact: true, component: () => <Redirect to="/brews" /> }
];

export { authProtectedRoutes, publicRoutes };