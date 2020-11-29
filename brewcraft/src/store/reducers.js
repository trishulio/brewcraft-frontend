import { combineReducers } from "redux";
import Layout from "./layout/reducer";
import Breadcrumb from "./Breadcrumb/reducer";
import Brewery from "./Brewery/reducer";
import Customers from './Customers/reducer';
import Materials from './Materials/reducer';
import Purchases from "./Purchases/reducer";
import Driver from './Driver/reducer';
import Vechicles from './Vechicles/reducer';
import Invoice from './Invoice/reducer';
import Inventory from './Inventory/reducer';
import Tax from './Tax/reducer';
import Vendor from './Vendor/reducer';
import Company from './Company/reducer';
const rootReducer = combineReducers({
  Layout,
  //Breadcrumb items
  Breadcrumb,
  Purchases,
  // Brewery
  Brewery,
  Customers,
  Materials,
  // Contacts
  Driver,
  Vechicles,
  Invoice,
  Inventory,
  Tax,
  Vendor,
  Company
});

export default rootReducer;
