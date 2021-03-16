import {
    FETCH_PURCHASES_REQUEST,
    FETCH_PURCHASE_REQUEST,
    CREATE_PURCHASE_REQUEST,
    UPDATE_COMPANY_REQUEST,
    DELETE_COMPANY_REQUEST
} from "./actionTypes";

export const fetchPurchases = () => ({
    type: FETCH_PURCHASES_REQUEST
});

export const fetchPurchase = (id) => ({
    type: FETCH_PURCHASE_REQUEST,
    payload: {
        id: id
    }
});

export const createPurchase = (data) => ({
    type: CREATE_PURCHASE_REQUEST,
    payload: {
        data: data
    }
});

export const updatePurchase = (data) => ({
    type: FETCH_PURCHASE_REQUEST,
    payload: {
        data: data
    }
});

export const deletePurchase = (id) => ({
    type: FETCH_PURCHASE_REQUEST,
    payload: {
        id: id
    }
});