import { combineReducers } from "redux";
import Batch from "./Batch/reducer";
import Batches from "./Batches/reducer";
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
import Company from "./Company/reducer";
import Companies from "./Companies/reducer";
import Customers from './Customers/reducer';
import Equipment from './Equipment/reducer';
import MaterialCategories from "./MaterialCategories/reducer";
import MaterialCategory from "./MaterialCategory/reducer";
import Packaging from "./Packaging/reducer";
import PackagingItem from "./PackagingItem/reducer";
import PurchaseInvoice from "./PurchaseInvoice/reducer";
import PurchaseInvoices from "./PurchaseInvoices/reducer";
import Driver from './Driver/reducer';
import Vechicles from './Vechicles/reducer';
import Invoice from './Invoice/reducer';
import Inventory from './Inventory/reducer';
import Tax from './Tax/reducer';
import Supplier from './Supplier/reducer';
import Suppliers from './Suppliers/reducer';
import Profile from './Profile/reducer';
import Snackbar from "./Snackbar/reducer";
import Storages from "./Storages/reducer";

const rootReducer = combineReducers({
  Batch,
  Batches,
  FinishedGood,
  FinishedGoods,
  Ingredient,
  Ingredients,
  Layout,
  Notifications,
  Breadcrumb,
  PurchaseInvoice,
  PurchaseInvoices,
  // Brewery,
  Product,
  ProductCategories,
  ProductCategory,
  Products,
  Customers,
  Company,
  Companies,
  MaterialCategories,
  MaterialCategory,
  Packaging,
  PackagingItem,
  // Profile,
  // Driver,
  // Vechicles,
  Invoice,
  // Inventory,
  Supplier,
  Suppliers,
  // Tax,
  // Equipment,
  Snackbar,
  // Storages
});

export default rootReducer;
