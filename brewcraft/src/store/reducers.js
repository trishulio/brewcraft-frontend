import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";

import Breadcrumb from "./Breadcrumb/reducer";
import Suppliers  from './Suppliers/reducer';
import Modal from "./Modal/reducer";
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

const rootReducer = combineReducers({
  // public
  Layout,

    // public
    Layout,

    //Breadcrumb items
    Breadcrumb,
    Purchases,

    // Brewery
    Brewery,
    Customers,
    Materials,
    Suppliers,
    Modal,
    // Authentication
    Account,
    Login,
    Forget,
    // Contacts
    Driver,
    Vechicles

});

export default rootReducer;
