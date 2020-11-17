import { all } from 'redux-saga/effects'

// public
import LayoutSaga from './layout/saga';
import Customers from './Customers/saga';
import Driver from './Driver/saga';
import  Vechicles from './Vechicles/saga';
import  Invoice from './Invoice/saga';

export default function* rootSaga() {
    yield all([
        // public
        LayoutSaga(),
        Customers(),
        Driver(),
        Vechicles(),
        Invoice()
    ])
}