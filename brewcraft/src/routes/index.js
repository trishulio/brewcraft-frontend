import React from "react";
import { Redirect } from "react-router-dom";

import Pageslogin from '../pages/Authentication/Login';
import Logout from '../pages/Authentication/Logout';
import Pagesregister from '../pages/Authentication/Register';
import ForgetPassword from '../pages/Authentication/ForgetPassword';
import LockScreen from "../pages/Authentication/pages-lock-screen";

// Dashboard
import Dashboard from '../pages/Dashboard/dashboard';

// Brewcraft
import RawMaterials from '../pages/RawMaterials';
import RawMaterialsDiscover from '../pages/RawMaterials/discover';
import RawMaterialsRecords from '../pages/RawMaterials/records';

import Brews from '../pages/Brews/brews';
import Equipment from '../pages/Equipment/equipment';
import Facility from '../pages/Facility/facility';
import FinishedGoods from '../pages/FinishedGoods/finished-goods';
import Packaging from '../pages/Packaging/packaging';
import Reports from '../pages/Reports/reports';
import { Suppliers } from "../pages/Suppliers/suppliers";

import Contacts from '../pages/Contacts/Contacts';


const authProtectedRoutes = [
  // DashBoard
  { path: "/dashboard", component: Dashboard },

  // Brewcraft
  { path: "/brews", component: Brews },
  { path: "/equipment", component: Equipment },
  { path: "/facility", component: Facility },
  { path: "/finished-goods", component: FinishedGoods },
  { path: "/packaging", component: Packaging },
  { path: "/reports", component: Reports },

  // Suppliers
  { path: '/Suppliers', component: Suppliers },

  // Raw Materials
  { path: "/raw-materials/discover", component: RawMaterialsDiscover },
  { path: "/raw-materials/records", component: RawMaterialsRecords },
  { path: "/raw-materials", component: RawMaterials },

// contacts
  { path: "/contacts", component: Contacts },

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
