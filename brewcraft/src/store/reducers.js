import { combineReducers } from "redux";
import Layout from "./layout/reducer";
import Breadcrumb from "./Breadcrumb/reducer";
import Brewery from "./Brewery/reducer";
import Companies from "./Companies/reducer";
import Customers from './Customers/reducer';
import Materials from './Materials/reducer';
import Purchases from "./Purchases/reducer";
import Driver from './Driver/reducer';
import Vechicles from './Vechicles/reducer';
import Invoice from './Invoice/reducer';
import Inventory from './Inventory/reducer';
import Tax from './Tax/reducer';
import Suppliers from './Suppliers/reducer';
import Equipments from './Equipment/reducer';

const rootReducer = combineReducers({
  Layout,
  Breadcrumb,
  Purchases,
  Brewery,
  Customers,
  Companies,
  Materials,
  Driver,
  Vechicles,
  Invoice,
  Inventory,
  Suppliers,
  Tax,
  Equipments
});

export default rootReducer;
