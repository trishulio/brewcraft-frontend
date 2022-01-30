import {
    ADD_BATCH_REQUEST,
    ADD_BATCH_FAILURE,
    EDIT_BATCH_REQUEST,
    EDIT_BATCH_SUCCESS,
    ADD_BATCH_SUCCESS,
    SET_BATCH_DETAILS,
    RESET_BATCH_DETAILS,
    SET_INITIAL_BATCH_DETAILS,
    EDIT_BATCH_FAILURE,
    FETCH_BATCH_BY_ID_REQUEST,
    FETCH_BATCH_BY_ID_SUCCESS,
    FETCH_BATCH_BY_ID_FAILURE,
} from "./actionTypes";

const initialState = {
    data: {
        id: "",
        name: "",
        description: "",
        batchId: "",
        product: {
            id: "",
        },
        startedAt: "",
        endedAt: "",
        createdAt: null,
        version: null,
    },
    initial: {
        id: "",
        name: "",
        description: "",
        batchId: "",
        product: {
            id: "",
        },
        startedAt: "",
        endedAt: "",
        createdAt: null,
        version: null,
    },
    invalidName: false,
    invalidBatchId: false,
    invalidDescription: false,
    invalidParentBrewId: false,
    invalidProduct: false,
    invalidStartedAt: false,
    invalidEndedAt: false,
    loading: true,
    error: null,
};

const Brew = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_BATCH_DETAILS:
            return {
                ...state,
                ...payload,
                error: null,
            };
        case SET_INITIAL_BATCH_DETAILS:
            return {
                ...state,
                initial: {
                    ...initialState.initial,
                    ...payload,
                },
                error: null,
            };
        case FETCH_BATCH_BY_ID_REQUEST:
        case ADD_BATCH_REQUEST:
        case EDIT_BATCH_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_BATCH_BY_ID_SUCCESS:
        case ADD_BATCH_SUCCESS:
        case EDIT_BATCH_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case FETCH_BATCH_BY_ID_FAILURE:
        case ADD_BATCH_FAILURE:
        case EDIT_BATCH_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case RESET_BATCH_DETAILS:
            return {
                data: {
                    ...initialState.data,
                },
                initial: {
                    ...initialState.initial,
                },
                loading: false,
                error: null,
            };
        default:
            return {
                ...state,
                error: null,
            };
    }
};

export default Brew;
