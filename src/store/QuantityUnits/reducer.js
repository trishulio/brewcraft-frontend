import {
    FETCH_QUANTITY_UNITS_REQUEST,
    FETCH_QUANTITY_UNITS_SUCCESS,
    FETCH_QUANTITY_UNITS_FAILURE,
} from "./actionTypes";
const initialState = {
    loading: false,
    error: null,
};

const QuantityUnits = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_QUANTITY_UNITS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_QUANTITY_UNITS_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case FETCH_QUANTITY_UNITS_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        default:
            state = { ...state };
            break;
    }
    return state;
};

export default QuantityUnits;
