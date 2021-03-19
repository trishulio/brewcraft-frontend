import { all } from 'redux-saga/effects'

import LayoutSaga from './layout/saga';
import Companies from './Companies/saga';
import Customers from './Customers/saga';
import Driver from './Driver/saga';
import Vechicles from './Vechicles/saga';
import Invoice from './Invoice/saga';
import Purchases from './Invoice/saga';
import Suppliers from './Suppliers/saga';
import Equipment from './Equipment/saga';
import Materials from './Materials/saga';

export default function* rootSaga() {
    yield all([
        LayoutSaga(),
        Companies(),
        Customers(),
        Driver(),
        Vechicles(),
        Invoice(),
        Purchases(),
        Suppliers(),
        Equipment(),
        Materials()
    ])
}