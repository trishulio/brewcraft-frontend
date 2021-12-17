import { combineReducers } from "redux";
import Brew from "./Brew/reducer";
import Batches from "./Batches/reducer";
import BatchStatus from "./BatchStatus/reducer";
import BatchTask from "./BatchTask/reducer";
import Breadcrumb from "./Breadcrumb/reducer";
import Brewery from "./Brewery/reducer";
import {
  MashStage,
  KettleStage,
  WhirlpoolStage,
  TransferStage,
  FermentStage,
  ConditionStage,
  BriteTankStage
} from "./BrewStages/reducer";
import FinishedGood from "./FinishedGood/reducer";
import {
  FermentFinishedGoods,
  ConditionFinishedGoods,
  BriteTankFinishedGoods
} from "./FinishedGoods/reducer";
import Ingredient from "./Ingredient/reducer";
import Ingredients from "./Ingredients/reducer";
import Layout from "./layout/reducer";
import Notifications from "./Notifications/reducer";
import Product from "./Product/reducer";
import ProductCategories from "./ProductCategories/reducer";
import ProductCategory from "./ProductCategory/reducer";
import Products from "./Products/reducer";
import Profile from "./Profile/reducer";
import MaterialLots from "./MaterialLots/reducer";
import {
  MashMaterialPortion,
  KettleMaterialPortion,
  FermentMaterialPortion
} from "./MaterialPortion/reducer";
import Materials from "./Materials/reducer";
import MaterialCategories from "./MaterialCategories/reducer";
import MaterialCategory from "./MaterialCategory/reducer";
import Measures from "./Measures/reducer";
import {
  MashMixture,
  KettleMixture,
  WhirlpoolMixture,
  TransferMixture,
  FermentMixture
} from "./Mixture/reducer";
import {
  KettleMixtureRecordings,
  WhirlpoolMixtureRecordings,
  TransferMixtureRecordings,
  FermentMixtureRecordings
} from "./MixtureRecording/reducer";
import Packaging from "./Packaging/reducer";
import PackagingItem from "./PackagingItem/reducer";
import Procurement from "./Procurement/reducer";
import Procurements from "./Procurements/reducer";
import PurchaseInvoices from "./PurchaseInvoices/reducer";
import Invoice from './Invoice/reducer';
import RawMaterials from "./RawMaterials/reducer";
import Shipments from "./Shipments/reducer";
import Sku from "./Sku/reducer";
import Skus from "./Skus/reducer";
import Supplier from "./Supplier/reducer";
import Suppliers from "./Suppliers/reducer";
import SupplierContact from './SupplierContact/reducer';
import SupplierContacts from './SupplierContacts/reducer';
import Snackbar from "./Snackbar/reducer";
import User from "./User/reducer";
import Users from "./Users/reducer";
import UserRoles from "./UserRoles/reducer";

const rootReducer = combineReducers({
  Batch: combineReducers({
    Batch: Brew,
    MashStage,
    MashMixture,
    MashMaterialPortion,
    KettleStage,
    KettleMixture,
    KettleMaterialPortion,
    KettleMixtureRecordings,
    WhirlpoolStage,
    WhirlpoolMixture,
    WhirlpoolMixtureRecordings,
    TransferStage,
    TransferMixture,
    TransferMixtureRecordings,
    FermentStage,
    FermentMixture,
    FermentMaterialPortion,
    FermentMixtureRecordings,
    FermentFinishedGoods,
    ConditionStage,
    ConditionFinishedGoods,
    BriteTankStage,
    BriteTankFinishedGoods
  }),
  Batches,
  BatchStatus,
  BatchTask,
  Breadcrumb,
  Brewery,
  FinishedGood,
  Ingredient,
  Ingredients,
  Invoice,
  Layout,
  MaterialLots,
  Materials,
  MaterialCategories,
  MaterialCategory,
  Measures,
  Notifications,
  Packaging,
  PackagingItem,
  Procurement,
  Procurements,
  Product,
  ProductCategories,
  ProductCategory,
  Products,
  Profile,
  PurchaseInvoices,
  RawMaterials,
  Shipments,
  Sku,
  Skus,
  Snackbar,
  Supplier,
  Suppliers,
  SupplierContact,
  SupplierContacts,
  User,
  Users,
  UserRoles
});

export default rootReducer;