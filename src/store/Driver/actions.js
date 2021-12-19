import {
    ADD_DELIVERY_REQUEST,
    EDIT_DELIVERY_REQUEST,
    DELETE_DELIVERY_REQUEST,
    OPEN_DELIVERY_REQUEST,
} from "./actionTypes";

export const saveDelivery = (payload) => ({
    type: ADD_DELIVERY_REQUEST,
    payload: payload,
});

export const editDelivery = (payload) => ({
    type: EDIT_DELIVERY_REQUEST,
    payload: payload,
});

export const deleteDelivery = (payload) => ({
    type: DELETE_DELIVERY_REQUEST,
    payload: payload,
});

export const dialogPen = (payload) => ({
    type: DELETE_DELIVERY_REQUEST,
    payload: payload,
});
