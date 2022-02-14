import {
    FETCH_MIXTURES_REQUEST,
    FETCH_MIXTURES_SUCCESS,
    FETCH_MIXTURES_ERROR,
} from "./actionTypes";

const initialState = {
    content: [],
    all: [],
    loading: false,
    error: null,
    totalElements: 0,
    totalItems: 0,
    pageIndex: 0,
    pageSize: 20,
};

const Mixtures = (state = initialState, { type, payload, data }) => {
    switch (type) {
        case FETCH_MIXTURES_REQUEST:
            return {
                ...state,
                data: null,
                loading: true,
                error: null,
            };
        case FETCH_MIXTURES_SUCCESS:
            return {
                ...state,
                ...data.data,
                loading: false,
                error: null,
            };
        case FETCH_MIXTURES_ERROR:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        default:
            return {
                ...state,
                loading: true,
                error: null,
            };
    }
};

export default Mixtures;
