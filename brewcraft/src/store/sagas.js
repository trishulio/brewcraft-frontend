import { all } from 'redux-saga/effects'

//public
import accountSaga from './auth/register/saga';
import loginSaga from './auth/login/saga';
import forgetSaga from './auth/forgetpwd/saga';
import LayoutSaga from './layout/saga';
import Customers from './Customers/saga';

// import Delivery from './Delivery/saga';
import Driver from './Driver/saga';
import  Vechicles from './Vechicles/saga';

export default function* rootSaga() {
    yield all([

        //public
        accountSaga(),
        loginSaga(),
        forgetSaga(),
        LayoutSaga(),
        Customers(),
        Driver(),
        Vechicles()
    ])
}