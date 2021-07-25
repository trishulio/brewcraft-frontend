import { all } from "redux-saga/effects"
import Batch from "./Batch/saga";
import FinishedGood from "./FinishedGood/saga";
import FinishedGoods from "./FinishedGoods/saga";
import Ingredient from "./Ingredient/saga";
import Ingredients from "./Ingredients/saga";
import LayoutSaga from "./layout/saga";
import Company from "./Company/saga";
import Companies from "./Companies/saga";
import Customers from "./Customers/saga";
import Driver from "./Driver/saga";
import Vechicles from "./Vechicles/saga";
import Invoice from "./Invoice/saga";
import Packaging from "./Packaging/saga";
import PackagingItem from "./PackagingItem/saga";
import PurchaseInvoice from "./PurchaseInvoice/saga";
import PurchaseInvoices from "./PurchaseInvoices/saga";
import Product from "./Product/saga";
import ProductCategories from "./ProductCategories/saga";
import ProductCategory from "./ProductCategory/saga";
import Products from "./Products/saga";
import Supplier from "./Supplier/saga";
import Suppliers from "./Suppliers/saga";
import Equipment from "./Equipment/saga";
import MaterialCategories from "./MaterialCategories/saga";
import MaterialCategory from "./MaterialCategory/saga";
import Storages from "./Storages/saga";

export default function* rootSaga() {
    yield all([
        LayoutSaga(),
        Batch(),
        Company(),
        Companies(),
        Customers(),
        Driver(),
        FinishedGood(),
        FinishedGoods(),
        Ingredient(),
        Ingredients(),
        Vechicles(),
        Invoice(),
        Packaging(),
        PackagingItem(),
        PurchaseInvoice(),
        PurchaseInvoices(),
        Product(),
        ProductCategories(),
        ProductCategory(),
        Products(),
        Supplier(),
        Suppliers(),
        Equipment(),
        MaterialCategories(),
        MaterialCategory(),
        Storages()
    ])
}