import { combineReducers } from "redux";
import Layout from "./layout/reducer";
import Notifications from "./Notifications/reducer";
import Breadcrumb from "./Breadcrumb/reducer";
import Brewery from "./Brewery/reducer";
import Products from "./Products/reducer";
import Companies from "./Companies/reducer";
import Customers from './Customers/reducer';
import Equipment from './Equipment/reducer';
import Materials from './Materials/reducer';
import Purchases from "./Purchases/reducer";
import Driver from './Driver/reducer';
import Vechicles from './Vechicles/reducer';
import Invoice from './Invoice/reducer';
import Inventory from './Inventory/reducer';
import Tax from './Tax/reducer';
import Suppliers from './Suppliers/reducer';
import Profile from './Profile/reducer';
import Snackbar from "./Snackbar/reducer";
import Storages from "./Storages/reducer";

const rootReducer = combineReducers({
  Layout,
  Notifications,
  Breadcrumb,
  Purchases,
  Brewery,
  Products,
  Customers,
  Companies,
  Materials,
  Profile,
  Driver,
  Vechicles,
  Invoice,
  Inventory,
  Suppliers,
  Tax,
  Equipment,
  Snackbar,
  Storages
});

export default rootReducer;
