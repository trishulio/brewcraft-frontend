import { combineReducers  } from 'redux';

// Front
import Layout from './layout/reducer';

import Breadcrumb from "./Breadcrumb/reducer";

import Brewery from "./Brewery/reducer";

// Authentication Module
import Account from './auth/register/reducer';
import Login from './auth/login/reducer';
import Forget from './auth/forgetpwd/reducer';
import { suppliersReducer } from './suppliers/suppliers-reducer';
import { globalReducer } from './global/globalReducer';
import Contacts from './Contacts/reducer';
import {modalReducer} from "./modal/modal-reducer";
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
    suppliers: suppliersReducer,
    // Contacts
    Contacts,
    modal: modalReducer,
});

export default rootReducer;
