import {
    ADD_BATCH_REQUEST,
    ADD_BATCH_FAILURE,
    EDIT_BATCH,
    EDIT_BATCH_SUCCESS,
    ADD_BATCH_SUCCESS,
    SET_BATCH_DETAILS,
    RESET_BATCH_DETAILS,
    SET_INITIAL_BATCH_DETAILS,
    EDIT_BATCH_FAILURE,
    FETCH_BATCH_BY_ID_REQUEST,
    FETCH_BATCH_BY_ID_SUCCESS,
    SET_BATCH_ERROR,
    FETCH_BATCH_FAILURE,
    CREATE_BATCH_SUCCESS,
    CREATE_BATCH_FAILURE,
    ADD_BATCH_STAGE_FAILURE,
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
            };
        case SET_INITIAL_BATCH_DETAILS:
            return {
                ...state,
                initial: {
                    ...initialState.initial,
                    ...payload,
                },
            };
        case FETCH_BATCH_BY_ID_REQUEST:
        case ADD_BATCH_REQUEST:
        case EDIT_BATCH:
            return {
                ...state,
                loading: true,
            };
        case FETCH_BATCH_BY_ID_SUCCESS:
        case CREATE_BATCH_SUCCESS:
        case EDIT_BATCH_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case ADD_BATCH_SUCCESS:
        case FETCH_BATCH_FAILURE:
        case CREATE_BATCH_FAILURE:
        case ADD_BATCH_FAILURE:
        case ADD_BATCH_STAGE_FAILURE:
        case EDIT_BATCH_FAILURE:
        case SET_BATCH_ERROR:
            return {
                ...state,
                loading: false,
                error: {
                    ...payload,
                },
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
            };
    }
};

export default Brew;
