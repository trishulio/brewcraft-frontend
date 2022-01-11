import { all } from "redux-saga/effects";
import Batch from "./Brew/saga";
import Batches from "./Batches/saga";
import BatchStatus from "./BatchStatus/saga";
import BatchTasks from "./BatchTask/saga";
import BrewStage from "./BrewStages/saga";
import FinishedGood from "./FinishedGood/saga";
import FinishedGoods from "./FinishedGoods/saga";
import FinishedGoodsInventory from "./FinishedGoodsInventory/saga";
import Ingredient from "./Ingredient/saga";
import Ingredients from "./Ingredients/saga";
import LayoutSaga from "./layout/saga";
import Invoice from "./Invoice/saga";
import MaterialLots from "./MaterialLots/saga";
import MaterialPortion from "./MaterialPortion/saga";
import Materials from "./Materials/saga";
import MaterialCategories from "./MaterialCategories/saga";
import MaterialCategory from "./MaterialCategory/saga";
import Measures from "./Measures/saga";
import MiniCards from "./MiniCards/saga";
import Mixture from "./Mixture/saga";
import MixtureRecording from "./MixtureRecording/saga";
import Packaging from "./Packaging/saga";
import PackagingItem from "./PackagingItem/saga";
import Procurement from "./Procurement/saga";
import Procurements from "./Procurements/saga";
import PurchaseInvoices from "./PurchaseInvoices/saga";
import Product from "./Product/saga";
import ProductCategories from "./ProductCategories/saga";
import ProductCategory from "./ProductCategory/saga";
import Products from "./Products/saga";
import Shipments from "./Shipments/saga";
import Sku from "./Sku/saga";
import Skus from "./Skus/saga";
import Supplier from "./Supplier/saga";
import Suppliers from "./Suppliers/saga";
import SupplierContact from "./SupplierContact/saga";
import SupplierContacts from "./SupplierContacts/saga";
import RawMaterials from "./RawMaterials/saga";
import User from "./User/saga";
import Users from "./Users/saga";
import UserRoles from "./UserRoles/saga";

export default function* rootSaga() {
    yield all([
        LayoutSaga(),
        Batch(),
        Batches(),
        BatchStatus(),
        BatchTasks(),
        BrewStage(),
        FinishedGood(),
        FinishedGoods(),
        FinishedGoodsInventory(),
        Ingredient(),
        Ingredients(),
        Invoice(),
        MaterialLots(),
        MaterialPortion(),
        Materials(),
        MaterialCategories(),
        MaterialCategory(),
        Measures(),
        MiniCards(),
        Mixture(),
        MixtureRecording(),
        Packaging(),
        PackagingItem(),
        Procurement(),
        Procurements(),
        Product(),
        ProductCategories(),
        ProductCategory(),
        Products(),
        PurchaseInvoices(),
        RawMaterials(),
        Shipments(),
        Sku(),
        Skus(),
        Supplier(),
        Suppliers(),
        SupplierContact(),
        SupplierContacts(),
        User(),
        Users(),
        UserRoles(),
    ]);
}
