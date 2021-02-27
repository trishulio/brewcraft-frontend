import React from "react";
import { Redirect } from "react-router-dom";

// Dashboard
import Dashboard from '../pages/Dashboard/dashboard';

// Deliveries
import Deliveries from '../pages/Delivery/delivery';
import DeliveryDrivers from '../pages/Delivery/deliver-detail';

// Brews
import BrewsDashboard from '../pages/Brews/dashboard';
import BrewsActive from '../pages/Brews/active';
import Brews from '../pages/Brews/brews';

// Customers
import CustomerList from '../pages/Customers/list';
import CustomerInvoices from '../pages/CustomerInvoices/invoices';
import CustomerNewInvoice from '../pages/CustomerInvoices/create-invoice';
import CustomerViewInvoice from '../pages/CustomerInvoices/view-invoice';

// Equipment
import Equipment from '../pages/Equipment/index'

// Facility
import Facility from "../pages/Facility/facility";

// Finished Goods
import FinishedGoodsInventory from '../pages/FinishedGoods/inventory';

// Locations
import Locations from '../pages/Locations';

// Materials
import MaterialsIngredients from '../pages/Materials/ingredients';
import MaterialsPackaging from '../pages/Materials/packaging';
import MaterialCategories from '../pages/Materials/categories';

// Packaging
import PackagingInventory from '../pages/Packaging/inventory';
import PackagingRecords from '../pages/Packaging/records';

// Reports
import ReportsK50B from '../pages/Reports/k50b';
import ReportsN10 from '../pages/Reports/n10';

// Vendors
import VendorsDashboard from '../pages/Vendors/dashboard';
import VendorsList from '../pages/Vendors/list';
import PurchaseInvoices from '../pages/Vendors/invoices/Invoices';
import InvoicesDetail from '../pages/Vendors/invoices/invoice-detail';
import Createinvoice from '../pages/Vendors/invoices/create-invoice';

const authProtectedRoutes = [
  // Customers
  { path: "/customers/list", component: CustomerList },
  { path: "/customers/invoice/new", component: CustomerNewInvoice },
  { path: "/customers/invoice/:id", component: CustomerViewInvoice },
  { path: "/customers/invoices", component: CustomerInvoices },

  // Brews
  { path: "/brews/active-brews", component: BrewsActive },
  { path: "/brews/dashboard", component: BrewsDashboard },
  { path: "/brews", component: Brews },

  // Dashboard
  { path: "/dashboard", component: Dashboard },

  // Deliveries
  { path: "/deliveries", component: Deliveries },
  { path: "/delivery-drivers", component: DeliveryDrivers },

  // Equipment
  { path: "/equipment", component: Equipment },

  // Facility
  { path: "/facilities", component: Facility, exact:true },
  { path: "/floor-view", component: Facility, exact:true },

  // Finished Goods
  { path: "/finished-goods/inventory", component: FinishedGoodsInventory },

  // Locations
  { path: "/facilities/locations", component: Locations },

  // Materials
  { path: "/materials/ingredients/:id", component: MaterialsIngredients },
  { path: "/materials/ingredients", component: MaterialsIngredients },
  { path: "/materials/packaging", component: MaterialsPackaging },
  { path: "/materials/categories", component: MaterialCategories },
  { path: "/materials/purchases", component: PurchaseInvoices },
  // { path: "/materials/discover", component: MaterialsDiscover },
  // { path: "/materials/in-process", component: MaterialsInProcess },
  // { path: "/materials/records", component: MaterialsRecords },

  // Packaging
  { path: "/packaging/inventory", component: PackagingInventory },
  { path: "/packaging/records", component: PackagingRecords },

  // Reports
  { path: "/reports", component: ReportsK50B },
  { path: "/reports", component: ReportsN10 },

  // Vendors
  { path: "/vendors/dashboard", component: VendorsDashboard },
  { path: "/vendors/list", component: VendorsList },
  // { path: "/vendors/invoices", exact:true, component: PurchaseInvoices },
  { path: "/vendors/invoices/create", component: Createinvoice },
  { path: "/vendors/invoices/:id", component: InvoicesDetail },

  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> }
];

const publicRoutes = [];

export { authProtectedRoutes, publicRoutes };
