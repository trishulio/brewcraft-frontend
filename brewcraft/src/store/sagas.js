import { all } from "redux-saga/effects"
import Batch from "./Batch/saga";
import FinishedGood from "./FinishedGood/saga";
import FinishedGoods from "./FinishedGoods/saga";
import LayoutSaga from "./layout/saga";
import Companies from "./Companies/saga";
import Customers from "./Customers/saga";
import Driver from "./Driver/saga";
import Vechicles from "./Vechicles/saga";
import Invoice from "./Invoice/saga";
import Purchases from "./Invoice/saga";
import Product from "./Product/saga";
import ProductCategories from "./ProductCategories/saga";
import ProductCategory from "./ProductCategory/saga";
import Products from "./Products/saga";
import Suppliers from "./Suppliers/saga";
import Equipment from "./Equipment/saga";
import Materials from "./Materials/saga";
import Storages from "./Storages/saga";

export default function* rootSaga() {
    yield all([
        LayoutSaga(),
        Batch(),
        Companies(),
        Customers(),
        Driver(),
        FinishedGood(),
        FinishedGoods(),
        Vechicles(),
        Invoice(),
        Purchases(),
        Product(),
        ProductCategories(),
        ProductCategory(),
        Products(),
        Suppliers(),
        Equipment(),
        Materials(),
        Storages()
    ])
}