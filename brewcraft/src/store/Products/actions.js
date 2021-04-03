import {
    FETCH_PRODUCT_REQUEST
} from "./actionTypes";

export const fetchProductById = payload => ({
    type: FETCH_PRODUCT_REQUEST,
    payload: payload,
});