import React from "react";
import { Redirect } from "react-router-dom";
// Dashboard
import Dashboard from '../pages/Dashboard/dashboard';
// Deliveries
import Deliveries from '../pages/Delivery/delivery';
import DeliveryDrivers from '../pages/Delivery/deliver-detail';
// Brews
import Brews from '../pages/Brews/wort';
import Batch from '../pages/Batch';
import Batches from '../pages/Batches';
import FinishedGood from '../pages/FinishedGood';
import FinishedGoods from '../pages/FinishedGoods';
import Products from "../pages/Products";
import ProductItem from "../pages/Product";
import ProductCategories from "../pages/ProductCategories";
import ProductCategory from "../pages/ProductCategory";
// Customers
import CustomerList from '../pages/Customers/Customers';
import CustomerInvoices from '../pages/CustomerInvoices/invoices';
import CustomerNewInvoice from '../pages/CustomerInvoices/create-invoice';
import CustomerViewInvoice from '../pages/CustomerInvoices/view-invoice';
// Equipment
import Equipment from '../pages/Equipment/equipment';
// Facility
import Facility from "../pages/Facility/facility";
import Storage from '../pages/Storage';
// Materials
import Material from '../pages/Materials/material';
import Category from "../pages/Materials/category";
import MaterialsIngredients from '../pages/Materials/ingredients';
import Packaging from '../pages/Packaging';
import MaterialCategories from '../pages/Materials/categories';
// Reports
import ReportsK50B from '../pages/Reports/k50b';
import ReportsN10 from '../pages/Reports/n10';
// Contacts
import SuppliersList from '../pages/Contacts/suppliers';
import CompaniesList from '../pages/Contacts/companies';
import PurchaseInvoices from '../pages/Purchases/invoices';
import PurchaseInvoicesDetail from '../pages/Purchases/invoice';
import PurchaseInvoicesCreate from '../pages/Purchases/invoice-new';
import notFound from "../pages/pages-404";
const authProtectedRoutes = [
  // Brews (Depricated)
  { path: "/brews", component: Brews },

  // Dashboard
  { path: "/dashboard", component: Dashboard },

  // Batches
  { path: "/batches/:id", component: Batch },
  { path: "/batches", component: Batches },

  { path: "/finished-goods/:id", component: FinishedGood },
  { path: "/finished-goods", component: FinishedGoods },

  // Materials
  { path: "/ingredients", component: MaterialsIngredients },
  { path: "/packaging", component: Packaging },
  { path: "/materials/categories/:id", component: Category },
  { path: "/materials/categories", component: MaterialCategories },
  // { path: "/materials/:id", component: Material },
  { path: "/materials/:id/:category", component: Material },

  // Products
  { path: "/products/categories/:id", component: ProductCategory },
  { path: "/products/categories", component: ProductCategories },
  { path: "/products/:id", component: ProductItem },
  { path: "/products", component: Products },

  // Facility
  { path: "/facilities", component: Facility, exact: true },
  { path: "/floor-view", component: Facility, exact: true },
  { path: "/equipment", component: Equipment },
  // Purchases
  { path: "/purchases/create", component: PurchaseInvoicesCreate },
  { path: "/purchases/:id", component: PurchaseInvoicesDetail },
  { path: "/purchases", component: PurchaseInvoices },
  // Sales
  { path: "/sales-invoices/new", component: CustomerNewInvoice },
  { path: "/sales-invoices/:id", component: CustomerViewInvoice },
  { path: "/sales-invoices", component: CustomerInvoices },
  // Deliveries
  { path: "/deliveries", component: Deliveries },
  { path: "/delivery-drivers", component: DeliveryDrivers },
  // Locations
  { path: "/facilities/storage", component: Storage },
  // Materials
  { path: "/materials/ingredients", component: MaterialsIngredients },
  { path: "/materials/categories", component: MaterialCategories },
  { path: "/materials/:id", component: Material },
  // Reports
  { path: "/reports/k50b", component: ReportsK50B },
  { path: "/reports/n10", component: ReportsN10 },
  // Contacts
  { path: "/customers/list", component: CustomerList },
  { path: "/suppliers", component: SuppliersList },
  { path: "/contacts/companies", component: CompaniesList },
  // Default
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> }
];
const publicRoutes = [
  { path: "/404", component: notFound }
];
export { authProtectedRoutes, publicRoutes };