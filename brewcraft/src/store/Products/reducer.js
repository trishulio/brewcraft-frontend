import { combineReducers } from "redux";
import {
  FETCH_PRODUCT_REQUEST
} from "./actionTypes";

const initialState = {
    id: "1",
    name: "Fantastic Lager",
    description: "In the moood for something satisfying? Grab a F. Lager.",
    status: "actve",
    color: "info",
    type: "lager"
};

const Product = (state = initialState, { type, payload }) => {
    switch (type) {
      default:
        return {
          ...state,
          loading: true,
          error: null,
        };
    }
};

const Products = (state = [], { type, payload }) => {
    switch (type) {
      default:
        return {
          ...state,
          loading: true,
          error: null,
        };
    }
};

export default combineReducers({
    Product,
    Products
});