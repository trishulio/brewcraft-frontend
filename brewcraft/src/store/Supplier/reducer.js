import { findIndex, get, filter } from "lodash";
import {
    ADD_SUPPLIER_REQUEST,
    ADD_SUPPLIER_SUCCESS,
    ADD_SUPPLIER_FAILURE,
    EDIT_SUPPLIER_REQUEST,
    EDIT_SUPPLIER_SUCCESS,
    EDIT_SUPPLIER_FAILURE,
    DELETE_SUPPLIER_REQUEST,
    DELETE_SUPPLIER_SUCCESS,
    DELETE_SUPPLIER_FAILURE,
    FETCH_SUPPLIER_BY_ID_REQUEST,
    FETCH_SUPPLIER_BY_ID_SUCCESS,
    FETCH_SUPPLIER_BY_ID_FAILURE,
    SET_SUPPLIER_DETAILS,
    RESET_SUPPLIER_DETAILS,
    INVALID_SUPPLIER_NAME,
    INVALID_SUPPLIER_PARENT_SUPPLIER
} from "./actionTypes";

const initialState = {
    data: {
        id: "",
        firstName: "",
        lastName: "",
        company: "",
        position: "",
        email: "",
        phoneNumber: "",
        version: null
    },
    initial: {
        id: "",
        firstName: "",
        lastName: "",
        company: "",
        position: "",
        email: "",
        phoneNumber: "",
        version: null
    },
    invalidFirstName: false,
    invalidLastName: false,
    invalidPosition: false,
    invalidEmail: false,
    invalidPhoneNumber: false,
    invalidCompany: false,
    loading: true,
    error: null
  };

const Supplier = (state = initialState, { type, payload, data }) => {
    switch(type) {
        case SET_SUPPLIER_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null
            };
        case FETCH_SUPPLIER_BY_ID_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_SUPPLIER_BY_ID_SUCCESS:
            return {
                ...state,
                data: data,
                loading: false,
                error: null,
            };
        case FETCH_SUPPLIER_BY_ID_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case ADD_SUPPLIER_REQUEST:
            return {
                ...state,
                loading: false,
                error: null
            };
        case ADD_SUPPLIER_SUCCESS:
        case EDIT_SUPPLIER_SUCCESS:
            return {
                ...state,
                ...payload,
                data: {
                    ...state.data,
                    ...payload.data
                },
                loading: false,
                error: null
            };
        case ADD_SUPPLIER_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            };
        case EDIT_SUPPLIER_REQUEST:
            return {
                ...state,
                loading: false,
                error: null
            };
        case DELETE_SUPPLIER_REQUEST:
            return {
                ...state,
                loading: false,
                error: null
            };
        case DELETE_SUPPLIER_SUCCESS:
            return {
            ...state,
            data: filter([...state.data], (instanceData) => {
                return (
                    payload.id!==instanceData.id
                );
            }),
            loading: false,
            error: null
        };
        case RESET_SUPPLIER_DETAILS:
            return {
                ...initialState,
                loading: false,
                error: null
            };
        case INVALID_SUPPLIER_NAME:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null
            };
        default:
            return {
                ...state,
                loading: true,
                error: null
            }
    }
}

export default Supplier;