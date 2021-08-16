import {
    ADD_SUPPLIER_REQUEST,
    ADD_SUPPLIER_FAILURE,
    EDIT_SUPPLIER_REQUEST,
    EDIT_SUPPLIER_SUCCESS,
    DELETE_SUPPLIER_REQUEST,
    DELETE_SUPPLIER_SUCCESS,
    ADD_SUPPLIER_SUCCESS,
    SET_SUPPLIER_DETAILS,
    RESET_SUPPLIER_DETAILS
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

const Supplier = (state = initialState, { type, payload, data }) => {
    switch(type) {
        case SET_SUPPLIER_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null
            };
        case ADD_SUPPLIER_REQUEST:
        case EDIT_SUPPLIER_REQUEST:
        case DELETE_SUPPLIER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ADD_SUPPLIER_SUCCESS:
        case EDIT_SUPPLIER_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null
            };
        case ADD_SUPPLIER_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            };
        case DELETE_SUPPLIER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case RESET_SUPPLIER_DETAILS:
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

export default Supplier;