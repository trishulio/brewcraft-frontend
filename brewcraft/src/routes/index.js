import React from "react";
import { Redirect } from "react-router-dom";
import Dashboard from "../pages/Dashboard/dashboard";
import Batch from "../pages/Batch";
import Batches from "../pages/Batches";
import FinishedGood from "../pages/FinishedGood";
import FinishedGoods from "../pages/FinishedGoods";
import Products from "../pages/Products";
import Product from "../pages/Product";
import ProductCategories from "../pages/ProductCategories";
import ProductCategory from "../pages/ProductCategory";
import RawMaterials from "../pages/RawMaterials";
import SalesCustomer from "../pages/Customers/Customers";
import SalesCustomers from "../pages/Customers/Customers";
import SalesReceipts from "../pages/CustomerInvoices/invoices";
import SalesReceipt from "../pages/CustomerInvoices/view-invoice";
import Sku from "../pages/Sku";
import Ingredient from "../pages/Ingredient";
import Ingredients from "../pages/Ingredients";
import MaterialCategory from "../pages/MaterialCategory";
import PackagingItem from "../pages/PackagingItem";
import Packaging from "../pages/Packaging";
import MaterialCategories from "../pages/MaterialCategories";
import Supplier from "../pages/Supplier";
import Suppliers from "../pages/Suppliers";
import SupplierContact from "../pages/SupplierContact";
import SupplierContacts from "../pages/SupplierContacts";
import PurchaseInvoice from "../pages/PurchaseInvoice";
import PurchaseInvoices from "../pages/PurchaseInvoices";
import notFound from "../pages/pages-404";
import Reports from "../pages/Reports/k50b";

const publicRoutes = [
  { path: "/404", component: notFound }
];

const authProtectedRoutes = [
  // Dashboard
  { path: "/dashboard", component: Dashboard },

  // Batches
  { path: "/batches/:id", component: Batch },
  { path: "/batches", component: Batches },

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

  // Default
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> }
];

export { authProtectedRoutes, publicRoutes };