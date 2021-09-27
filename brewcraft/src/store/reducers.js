import { combineReducers } from "redux";
import Batch from "./Batch/reducer";
import Batches from "./Batches/reducer";
import BatchStatus from "./BatchStatus/reducer";
import BatchTask from "./BatchTask/reducer";
import Breadcrumb from "./Breadcrumb/reducer";
import Brewery from "./Brewery/reducer";
import FinishedGood from "./FinishedGood/reducer";
import FinishedGoods from "./FinishedGoods/reducer";
import Ingredient from "./Ingredient/reducer";
import Ingredients from "./Ingredients/reducer";
import Layout from "./layout/reducer";
import Notifications from "./Notifications/reducer";
import Product from "./Product/reducer";
import ProductCategories from "./ProductCategories/reducer";
import ProductCategory from "./ProductCategory/reducer";
import Products from "./Products/reducer";
import Profile from "./Profile/reducer";
import Materials from "./Materials/reducer";
import MaterialCategories from "./MaterialCategories/reducer";
import MaterialCategory from "./MaterialCategory/reducer";
import Packaging from "./Packaging/reducer";
import PackagingItem from "./PackagingItem/reducer";
import PurchaseInvoice from "./PurchaseInvoice/reducer";
import PurchaseInvoices from "./PurchaseInvoices/reducer";
import Invoice from './Invoice/reducer';
import RawMaterials from "./RawMaterials/reducer";
import Shipments from "./Shipments/reducer";
import Supplier from "./Supplier/reducer";
import Suppliers from "./Suppliers/reducer";
import SupplierContact from './SupplierContact/reducer';
import SupplierContacts from './SupplierContacts/reducer';
import Snackbar from "./Snackbar/reducer";
import Users from "./Users/reducer";

const rootReducer = combineReducers({
  Batch,
  Batches,
  BatchStatus,
  BatchTask,
  Breadcrumb,
  Brewery,
  FinishedGood,
  FinishedGoods,
  Ingredient,
  Ingredients,
  Invoice,
  Layout,
  Materials,
  MaterialCategories,
  MaterialCategory,
  Notifications,
  Packaging,
  PackagingItem,
  PurchaseInvoice,
  PurchaseInvoices,
  Product,
  ProductCategories,
  ProductCategory,
  Products,
  Profile,
  RawMaterials,
  Shipments,
  Snackbar,
  Supplier,
  Suppliers,
  SupplierContact,
  SupplierContacts,
  Users
});

export default rootReducer;