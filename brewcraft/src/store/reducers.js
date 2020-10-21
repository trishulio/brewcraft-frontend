import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";

import Breadcrumb from "./Breadcrumb/reducer";

import Brewery from "./Brewery/reducer";
import Customers from './Customers/reducer';
import Materials from './Materials/reducer';

import Purchases from "./Purchases/reducer";

// Authentication Module
import Account from './auth/register/reducer';
import Login from './auth/login/reducer';
import Forget from './auth/forgetpwd/reducer';
import Driver from './Driver/reducer';
import Vechicles from './Vechicles/reducer';
import Invoice from './Invoice/reducer';
import Inventory from './Inventory/reducer';
import Tax from './Tax/reducer';
import PurchaseItem from './PurchaseItem/reducer';
import ExpenseCategory from './ExpenseCategory/reducer';
import Vendor from "./Vendor/reducer";
import Currency from "./Currency/reducer";
const rootReducer = combineReducers({
  

    // public
    Layout,

    //Breadcrumb items
    Breadcrumb,
    Purchases,

    // Brewery
    Brewery,
    Customers,
    Materials,
    // Authentication
    Account,
    Login,
    Forget,
    // Contacts
    Driver,
    Vechicles,
    Invoice,
    Inventory,
    Tax,
    PurchaseItem,
    ExpenseCategory,
    Vendor,
    Currency

});

export default rootReducer;
