import { combineReducers  } from 'redux';

// Front
import Layout from './layout/reducer';

import Breadcrumb from "./Breadcrumb/reducer";

import Brewery from "./Brewery/reducer";

// Authentication Module
import Account from './auth/register/reducer';
import Login from './auth/login/reducer';
import Forget from './auth/forgetpwd/reducer';
import Contacts from './Contacts/reducer';

const rootReducer = combineReducers({

    // public
    Layout,

    //Breadcrumb items
    Breadcrumb,

    // Brewery
    Brewery,

    // Authentication
    Account,
    Login,
    Forget,
    // Contacts
    Contacts

});

export default rootReducer;