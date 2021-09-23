import { all } from "redux-saga/effects"
import Batch from "./Batch/saga";
import Batches from "./Batches/saga";
import BatchStatus from "./BatchStatus/saga";
import BatchTask from "./BatchTask/saga";
import FinishedGood from "./FinishedGood/saga";
import FinishedGoods from "./FinishedGoods/saga";
import Ingredient from "./Ingredient/saga";
import Ingredients from "./Ingredients/saga";
import LayoutSaga from "./layout/saga";
import Invoice from "./Invoice/saga";
import Materials from "./Materials/saga";
import MaterialCategories from "./MaterialCategories/saga";
import MaterialCategory from "./MaterialCategory/saga";
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
import SupplierContact from "./SupplierContact/saga";
import SupplierContacts from "./SupplierContacts/saga";
import RawMaterials from "./RawMaterials/saga";
import Users from "./Users/saga";

export default function* rootSaga() {
    yield all([
        LayoutSaga(),
        Batch(),
        Batches(),
        BatchStatus(),
        BatchTask(),
        FinishedGood(),
        FinishedGoods(),
        Ingredient(),
        Ingredients(),
        Invoice(),
        Materials(),
        MaterialCategories(),
        MaterialCategory(),
        Packaging(),
        PackagingItem(),
        PurchaseInvoice(),
        PurchaseInvoices(),
        Product(),
        ProductCategories(),
        ProductCategory(),
        Products(),
        RawMaterials(),
        Supplier(),
        Suppliers(),
        SupplierContact(),
        SupplierContacts(),
        Users()
    ])
}