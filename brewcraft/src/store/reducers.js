import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";

import Breadcrumb from "./Breadcrumb/reducer";

import Brewery from "./Brewery/reducer";
import Customers from './Customers/reducer';
import Materials from './materials/reducer';

import Purchases from "./Purchases/reducer";

// Authentication Module
import Account from './auth/register/reducer';
import Login from './auth/login/reducer';
import Forget from './auth/forgetpwd/reducer';

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

    // Authentication
    Account,
    Login,
    Forget
});

export default rootReducer;
