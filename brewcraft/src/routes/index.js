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
// import CustomersDashboard from '../pages/Customers/dashboard';
import CustomerList from '../pages/Customers/list';
import CustomerInvoices from '../pages/CustomerInvoices/invoices';
import CustomerNewInvoice from '../pages/CustomerInvoices/create-invoice';
import CustomerViewInvoice from '../pages/CustomerInvoices/view-invoice';

// Equipment
import Equipment from '../pages/Equipment/index'

// Facility
// import Facility from '../pages/Facilities';

// Finished Goods
import FinishedGoodsDashboard from '../pages/FinishedGoods/dashboard';
import FinishedGoodsInventory from '../pages/FinishedGoods/inventory';
import FinishedGoodsRecords from '../pages/FinishedGoods/records';

// Locations
import Locations from '../pages/Locations';

// Materials
import MaterialsRawMaterials from '../pages/Materials/raw-materials';
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
import Invoices from '../pages/Vendors/invoices/Invoices';
import InvoicesDetail from '../pages/Vendors/invoices/invoice-detail';
import Createinvoice from '../pages/Vendors/invoices/create-invoice';

const authProtectedRoutes = [
  // Customers
  // { path: "/customers/dashboard", component: CustomersDashboard },
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
  // { path: "/facilities", component: Facility },

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
  { path: "/vendors/invoices", exact:true, component: Invoices },
  { path: "/vendors/invoices/create", component: Createinvoice },
  { path: "/vendors/invoices/:id", component: InvoicesDetail },

  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> }
];

const publicRoutes = [];

export { authProtectedRoutes, publicRoutes };
