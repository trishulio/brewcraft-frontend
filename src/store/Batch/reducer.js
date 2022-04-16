import {
    ADD_BATCH,
    ADD_BATCH_FAILURE,
    EDIT_BATCH,
    EDIT_BATCH_SUCCESS,
    ADD_BATCH_SUCCESS,
    SET_BATCH_DETAILS,
    RESET_BATCH_DETAILS,
    EDIT_BATCH_FAILURE,
    GET_BATCH_FAILURE,
    ADD_BATCH_STAGE_FAILURE,
    GET_BATCH,
    ADD_BATCH_STAGE,
    GET_BATCH_SUCCESS,
    ADD_BATCH_STAGE_SUCCESS,
    DELETE_BATCH_MIXTURE_AND_STAGE,
    DELETE_BATCH_MIXTURE_AND_STAGE_SUCCESS,
    DELETE_BATCH_MIXTURE_AND_STAGE_FAILURE,
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
        assignedTo: null,
        ownedBy: null,
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
        assignedTo: null,
        ownedBy: null,
        createdAt: null,
        version: null,
    },
    loading: true,
    error: null,
};

const Batch = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_BATCH_DETAILS:
            return {
                ...state,
                ...payload,
            };
        case GET_BATCH:
        case ADD_BATCH:
        case EDIT_BATCH:
        case ADD_BATCH_STAGE:
        case DELETE_BATCH_MIXTURE_AND_STAGE:
            return {
                ...state,
                loading: true,
            };
        case GET_BATCH_SUCCESS:
        case ADD_BATCH_SUCCESS:
        case EDIT_BATCH_SUCCESS:
        case ADD_BATCH_STAGE_SUCCESS:
        case DELETE_BATCH_MIXTURE_AND_STAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
            };
        case GET_BATCH_FAILURE:
        case ADD_BATCH_FAILURE:
        case EDIT_BATCH_FAILURE:
        case ADD_BATCH_STAGE_FAILURE:
        case DELETE_BATCH_MIXTURE_AND_STAGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: {
                    ...payload,
                },
            };
        case RESET_BATCH_DETAILS:
            return {
                ...initialState,
                loading: false,
                error: null,
            };
        default:
            return {
                ...state,
            };
    }
};

export default Batch;
