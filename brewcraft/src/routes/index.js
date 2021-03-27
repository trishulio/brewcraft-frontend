import React from "react";
import { Redirect } from "react-router-dom";

// Dashboard
import Dashboard from '../pages/Dashboard/dashboard';

// Deliveries
import Deliveries from '../pages/Delivery/delivery';
import DeliveryDrivers from '../pages/Delivery/deliver-detail';

// Brews
import Brews from '../pages/Batches/brews';
import Fermentations from '../pages/Batches/fermenting';
import FinishedGoods from '../pages/Batches/finished-goods';

// Customers
import CustomerList from '../pages/Customers/Customers';
import CustomerInvoices from '../pages/CustomerInvoices/invoices';
import CustomerNewInvoice from '../pages/CustomerInvoices/create-invoice';
import CustomerViewInvoice from '../pages/CustomerInvoices/view-invoice';

// Equipment
import Equipment from '../pages/Equipment/equipment';

// Facility
import Facility from "../pages/Facility/facility";
import Locations from '../pages/Locations';

// Materials
import Material from '../pages/Materials/material';
import Category from "../pages/Materials/category";
import MaterialsIngredients from '../pages/Materials/ingredients';
import MaterialsPackaging from '../pages/Materials/packaging';
import MaterialCategories from '../pages/Materials/categories';

// Reports
import ReportsK50B from '../pages/Reports/k50b';
import ReportsN10 from '../pages/Reports/n10';

// Contacts
import SuppliersList from '../pages/Contacts/suppliers';
import CompaniesList from '../pages/Contacts/companies';
import PurchaseInvoices from '../pages/PurchaseInvoices/invoices';
import PurchaseInvoicesDetail from '../pages/PurchaseInvoices/invoice';
import PurchaseInvoicesCreate from '../pages/PurchaseInvoices/invoice-new';

import notFound from "../pages/pages-404";

const authProtectedRoutes = [
  // Dashboard
  { path: "/dashboard", component: Dashboard },

  // Batches
  { path: "/brews", component: Brews },
  { path: "/batches", component: Fermentations },
  { path: "/finished-goods", component: FinishedGoods },

  // Deliveries
  { path: "/deliveries", component: Deliveries },
  { path: "/delivery-drivers", component: DeliveryDrivers },

  // Equipment
  { path: "/equipment", component: Equipment },

  // Facility
  { path: "/facilities", component: Facility, exact: true },
  { path: "/floor-view", component: Facility, exact: true },

  // Finished Goods
  { path: "/sales-invoices/new", component: CustomerNewInvoice },
  { path: "/sales-invoices/:id", component: CustomerViewInvoice },
  { path: "/sales-invoices", component: CustomerInvoices },

  // Locations
  { path: "/facilities/locations", component: Locations },

  // Materials
  { path: "/ingredients", component: MaterialsIngredients },
  { path: "/packaging", component: MaterialsPackaging },
  { path: "/materials/categories/:id", component: Category },
  { path: "/materials/categories", component: MaterialCategories },
  { path: "/materials/:id", component: Material },

  // Reports
  { path: "/reports/k50b", component: ReportsK50B },
  { path: "/reports/n10", component: ReportsN10 },

  // Contacts
  { path: "/customers/list", component: CustomerList },
  { path: "/suppliers", component: SuppliersList },
  { path: "/contacts/companies", component: CompaniesList },

  // Purchase Invoices
  { path: "/purchases/create", component: PurchaseInvoicesCreate },
  { path: "/purchases/:id", component: PurchaseInvoicesDetail },
  { path: "/purchases", component: PurchaseInvoices },

  // Default
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> }
];

const publicRoutes = [
  { path: "/404", component: notFound }
];

export { authProtectedRoutes, publicRoutes };
