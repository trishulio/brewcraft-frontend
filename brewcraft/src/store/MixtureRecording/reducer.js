import { filter } from "lodash";
import {
    ADD_MIXTURE_RECORDING_REQUEST,
    ADD_MIXTURE_RECORDING_FAILURE,
    EDIT_MIXTURE_RECORDING_REQUEST,
    EDIT_MIXTURE_RECORDING_SUCCESS,
    DELETE_MIXTURE_RECORDING_REQUEST,
    DELETE_MIXTURE_RECORDING_SUCCESS,
    ADD_MIXTURE_RECORDING_SUCCESS,
    SET_MIXTURE_RECORDING_DETAILS,
    RESET_MIXTURE_RECORDING_DETAILS
} from "./actionTypes";

const initialState = {
    content: [],
    initial: [],
    totalElements: 0,
    totalPages: 0,
    loading: true,
    error: null
};

const TransferMixtureRecordings = (state = initialState, { type, payload } = {}) => {
    switch(type) {
        case SET_MIXTURE_RECORDING_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null
            };
        case ADD_MIXTURE_RECORDING_REQUEST:
        case EDIT_MIXTURE_RECORDING_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ADD_MIXTURE_RECORDING_SUCCESS:
        case EDIT_MIXTURE_RECORDING_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null
            };
        case ADD_MIXTURE_RECORDING_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            };
        case DELETE_MIXTURE_RECORDING_REQUEST:
        return {
            ...state,
            formLoading: { ...state.formLoading, loading: true },
        };
        case DELETE_MIXTURE_RECORDING_SUCCESS:
        return {
            ...state,
            data: filter([...state.data], (instanceData) => {
                return (
                    payload.id!==instanceData.id
                    );
                }),
                formLoading: { ...state.formLoading, loading: false },
            };
        case RESET_MIXTURE_RECORDING_DETAILS:
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

export {
    TransferMixtureRecordings
};