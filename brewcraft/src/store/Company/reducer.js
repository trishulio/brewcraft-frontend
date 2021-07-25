import { filter } from "lodash";
import {
    ADD_COMPANY_REQUEST,
    ADD_COMPANY_FAILURE,
    EDIT_COMPANY_REQUEST,
    EDIT_COMPANY_SUCCESS,
    DELETE_COMPANY_REQUEST,
    DELETE_COMPANY_SUCCESS,
    ADD_COMPANY_SUCCESS,
    SET_COMPANY_DETAILS,
    RESET_COMPANY_DETAILS
} from "./actionTypes";

const initialState = {
    data: {
        id: "",
        name: "",
        addressId: "",
        addressLine1: "",
        addressLine2: "",
        country: "",
        province: "",
        city: "",
        postalCode: "",
        version: null
    },
    initial: {
        id: "",
        name: "",
        addressId: "",
        addressLine1: "",
        addressLine2: "",
        country: "",
        province: "",
        city: "",
        postalCode: "",
        version: null
    },
    invalidName: false,
    invalidAddressLine1: false,
    invalidAddressLIne2: false,
    invalidCountry: false,
    invalidProvince: false,
    invalidCity: false,
    inalidPostalCode: false,
    loading: true,
    error: null
};

const Company = (state = initialState, { type, payload, data }) => {
    switch(type) {
        case SET_COMPANY_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null
            };
        case ADD_COMPANY_REQUEST:
        case EDIT_COMPANY_REQUEST:
        case DELETE_COMPANY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ADD_COMPANY_SUCCESS:
        case EDIT_COMPANY_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null
            };
        case ADD_COMPANY_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            };
        case DELETE_COMPANY_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case RESET_COMPANY_DETAILS:
        return {
            ...initialState,
            loading: false,
            error: null
        };
        default:
        return {
            ...state,
            loading: false,
            error: null
        };
    }
};

export default Company;