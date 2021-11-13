import { filter } from "lodash";
import {
    ADD_SUPPLIER_CONTACT_REQUEST,
    ADD_SUPPLIER_CONTACT_SUCCESS,
    ADD_SUPPLIER_CONTACT_FAILURE,
    EDIT_SUPPLIER_CONTACT_REQUEST,
    EDIT_SUPPLIER_CONTACT_SUCCESS,
    DELETE_SUPPLIER_CONTACT_REQUEST,
    DELETE_SUPPLIER_CONTACT_SUCCESS,
    FETCH_SUPPLIER_CONTACT_BY_ID_REQUEST,
    FETCH_SUPPLIER_CONTACT_BY_ID_SUCCESS,
    FETCH_SUPPLIER_CONTACT_BY_ID_FAILURE,
    SET_SUPPLIER_CONTACT_DETAILS,
    RESET_SUPPLIER_CONTACT_DETAILS,
    INVALID_SUPPLIER_CONTACT_FIRST_NAME,
    INVALID_SUPPLIER_CONTACT_LAST_NAME,
    INVALID_SUPPLIER_CONTACT_COMPANY,
    INVALID_SUPPLIER_CONTACT_POSITION,
    INVALID_SUPPLIER_CONTACT_EMAIL,
    INVALID_SUPPLIER_CONTACT_PHONE_NUMBER,
    EDIT_SUPPLIER_CONTACT_FAILURE,
    DELETE_SUPPLIER_CONTACT_FAILURE
} from "./actionTypes";

const initialState = {
    data: {
        id: "",
        firstName: "",
        lastName: "",
        supplier: "",
        position: "",
        email: "",
    phoneNumber: "",
        version: null
    },
    initial: {
        id: "",
        firstName: "",
        lastName: "",
        supplier: "",
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

const SupplierContact = (state = initialState, { type, payload, data }) => {
    switch(type) {
        case SET_SUPPLIER_CONTACT_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null
            };
        case FETCH_SUPPLIER_CONTACT_BY_ID_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_SUPPLIER_CONTACT_BY_ID_SUCCESS:
            return {
                ...state,
                data: data,
                loading: false,
                error: null,
            };
        case FETCH_SUPPLIER_CONTACT_BY_ID_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case ADD_SUPPLIER_CONTACT_REQUEST:
            return {
                ...state,
                loading: false,
                error: null
            };
        case ADD_SUPPLIER_CONTACT_SUCCESS:
        case EDIT_SUPPLIER_CONTACT_SUCCESS:
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
        case ADD_SUPPLIER_CONTACT_FAILURE:
        case EDIT_SUPPLIER_CONTACT_FAILURE:
        case DELETE_SUPPLIER_CONTACT_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            };
        case EDIT_SUPPLIER_CONTACT_REQUEST:
            return {
                ...state,
                loading: false,
                error: null
            };
        case DELETE_SUPPLIER_CONTACT_REQUEST:
            return {
                ...state,
                loading: false,
                error: null
            };
        case DELETE_SUPPLIER_CONTACT_SUCCESS:
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
        case RESET_SUPPLIER_CONTACT_DETAILS:
            return {
                ...initialState,
                loading: false,
                error: null
            };
        case INVALID_SUPPLIER_CONTACT_FIRST_NAME:
        case INVALID_SUPPLIER_CONTACT_LAST_NAME:
        case INVALID_SUPPLIER_CONTACT_COMPANY:
        case INVALID_SUPPLIER_CONTACT_POSITION:
        case INVALID_SUPPLIER_CONTACT_EMAIL:
        case INVALID_SUPPLIER_CONTACT_PHONE_NUMBER:
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

export default SupplierContact;