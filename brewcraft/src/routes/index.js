import React from "react";
import { Redirect } from "react-router-dom";

import Pageslogin from '../pages/Authentication/Login';
import Logout from '../pages/Authentication/Logout';
import Pagesregister from '../pages/Authentication/Register';
import ForgetPassword from '../pages/Authentication/ForgetPassword';
import LockScreen from "../pages/Authentication/pages-lock-screen";

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
// import CustomersDashboard from '../pages/Customers/dashboard';
import CustomersList from '../pages/Customers/list';
import CustomersInvoices from '../pages/Customers/invoices';

// Equipment
import Equipment from '../pages/Equipment/equipment';

// Facility
import Facility from '../pages/Facilities';

// Finished Goods
import FinishedGoodsDashboard from '../pages/FinishedGoods/dashboard';
import FinishedGoodsInventory from '../pages/FinishedGoods/inventory';
import FinishedGoodsRecords from '../pages/FinishedGoods/records';

// Locations
import Locations from '../pages/Locations';

// Materials
import MaterialsRawMaterials from '../pages/Materials/inventory';
import MaterialsInProcess from '../pages/Materials/in-process';
import MaterialsUsedMaterials from '../pages/Materials/used-materials';
import MaterialsWastedMaterials from '../pages/Materials/wasted-materials';
import MaterialsDiscover from '../pages/Materials/discover';
import MaterialsRecords from '../pages/Materials/records';
import MaterialsDashboard from '../pages/Materials';

// Packaging
import PackagingInventory from '../pages/Packaging/inventory';
import PackagingRecords from '../pages/Packaging/records';

// Reports
import ReportsK50B from '../pages/Reports/k50b';
import ReportsN10 from '../pages/Reports/n10';

// Vendors
import VendorsDashboard from '../pages/Vendors/dashboard';
import VendorsList from '../pages/Vendors/list';
import VendorsInvoices from '../pages/Vendors/invoices/Invoices';

import Invoices from '../pages/Invoices/invoices';
import Createinvoice from '../pages/Invoices/create-invoice';
import Viewinvoice from '../pages/Invoices/view-invoice';

const authProtectedRoutes = [
  // Customers
  // { path: "/customers/dashboard", component: CustomersDashboard },
  { path: "/customers/list", component: CustomersList },
  { path: "/customers/invoices", component: CustomersInvoices },

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
  { path: "/facilities", component: Facility },

  // Finished Goods
  { path: "/finished-goods/dashboard", component: FinishedGoodsDashboard },
  { path: "/finished-goods/inventory", component: FinishedGoodsInventory },
  { path: "/finished-goods/records", component: FinishedGoodsRecords },

  // Locations
  { path: "/facilities/locations", component: Locations },

  // Materials
  { path: "/materials/discover", component: MaterialsDiscover },
  { path: "/materials/raw-materials", component: MaterialsRawMaterials },
  { path: "/materials/in-process", component: MaterialsInProcess },
  { path: "/materials/used-materials", component: MaterialsUsedMaterials },
  { path: "/materials/wasted-materials", component: MaterialsWastedMaterials },
  { path: "/material/records", component: MaterialsRecords },
  { path: "/materials/", component: MaterialsDashboard },

  // Packaging
  { path: "/packaging/inventory", component: PackagingInventory },
  { path: "/packaging/records", component: PackagingRecords },

  // Reports
  { path: "/reports", component: ReportsK50B },
  { path: "/reports", component: ReportsN10 },

  // Vendors
  { path: "/vendors/dashboard", component: VendorsDashboard },
  { path: "/vendors/list", component: VendorsList },
  { path: "/vendors/invoices", component: VendorsInvoices },
// invoice
{ path: "/invoices", exact: true, component: Invoices },
{ path: "/create-invoice",  component: Createinvoice },
{ path: "/invoices/view-invoice/:id", component: Viewinvoice },
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> }
];

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Pageslogin },
  { path: "/register", component: Pagesregister },
  { path: '/forget-password', component: ForgetPassword },
  { path: '/pages-lock-screen', component: LockScreen }
];

export { authProtectedRoutes, publicRoutes };
