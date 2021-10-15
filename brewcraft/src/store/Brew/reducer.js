import { filter } from "lodash";
import {
    ADD_BATCH_REQUEST,
    ADD_BATCH_FAILURE,
    EDIT_BATCH_REQUEST,
    EDIT_BATCH_SUCCESS,
    DELETE_BATCH_REQUEST,
    DELETE_BATCH_SUCCESS,
    ADD_BATCH_SUCCESS,
    SET_BATCH_DETAILS,
    RESET_BATCH_DETAILS,
    SET_BATCH_INVALID_CATEGORY,
    SET_INITIAL_BATCH_DETAILS
} from "./actionTypes";

const initialState = {
    data: {
        id: "",
        name: "",
        description: "",
        batchId: "",
        product: {
            id: "",
            name: "",
            description: "",
            productClass: "",
            type: "",
            style: "",
            targetMeasures: [],
            version: null
        },
        parentBrew: "",
        startedAt: "",
        endedAt: "",
        createdAt: null,
        version: null
    },
    initial: {
        id: "",
        name: "",
        description: "",
        batchId: "",
        product: {
            id: "",
            name: "",
            description: "",
            productClass: "",
            type: "",
            style: "",
            targetMeasures: [],
            version: null
        },
        parentBrew: "",
        startedAt: "",
        endedAt: "",
        createdAt: null,
        version: null
    },
    invalidName: false,
    invalidBatchId: false,
    invalidDescription: false,
    invalidParentBrewId: false,
    invalidProduct: false,
    invalidStartedAt: false,
    invalidEndedAt: false,
    loading: true,
    error: null
};

const Batch = (state = initialState, { type, payload }) => {
    switch(type) {
        case SET_BATCH_DETAILS:
            return {
                ...state,
                data: {
                    ...state.data,
                    ...payload.data
                },
                loading: false,
                error: null
            };
        case SET_INITIAL_BATCH_DETAILS:
            return {
                ...state,
                initial: {
                    ...initialState.initial,
                    ...payload,
                },
                loading: false,
                error: null
            };
        case ADD_BATCH_REQUEST:
        case EDIT_BATCH_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ADD_BATCH_SUCCESS:
        case EDIT_BATCH_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null
            };
        case ADD_BATCH_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            };
        case DELETE_BATCH_REQUEST:
        return {
            ...state,
            formLoading: { ...state.formLoading, loading: true },
        };
        case DELETE_BATCH_SUCCESS:
        return {
            ...state,
            data: filter([...state.data], (instanceData) => {
                return (
                    payload.id!==instanceData.id
                    );
                }),
                formLoading: { ...state.formLoading, loading: false },
            };
        case RESET_BATCH_DETAILS:
        return {
            ...initialState,
            loading: false,
            error: null
        };
        case SET_BATCH_INVALID_CATEGORY:
            return {
                ...state,
                invalidCategory: payload,
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

export default Batch;