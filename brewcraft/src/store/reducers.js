import { combineReducers  } from 'redux';

// Front
import Layout from './layout/reducer';

import Breadcrumb from "./Breadcrumb/reducer";

import Brewery from "./Brewery/reducer";
import Customers from './Customers/reducer';
import Materials from './materials/reducer';

// Authentication Module
import Account from './auth/register/reducer';
import Login from './auth/login/reducer';
import Forget from './auth/forgetpwd/reducer';
import Suppliers  from './Suppliers/reducer';
import Modal from "./Modal/reducer";

const rootReducer = combineReducers({

    // public
    Layout,

    //Breadcrumb items
    Breadcrumb,

    // Brewery
    Brewery,
    Customers,
    Materials,

    // Authentication
    Account,
    Login,
    Forget
    Suppliers,
    Modal,
});

export default rootReducer;
