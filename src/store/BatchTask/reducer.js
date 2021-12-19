import {
    FETCH_BATCH_TASK_REQUEST,
    FETCH_BATCH_TASK_SUCCESS,
    FETCH_BATCH_TASK_FAILURE,
    SET_BATCH_TASK_DETAILS,
    SET_BATCH_TASK_PAGE_INDEX,
    SET_BATCH_TASK_PAGE_SIZE,
} from "./actionTypes";

const initialState = {
    content: [],
    loading: false,
    error: null,
    totalElements: 0,
    totalPages: 0,
    pageIndex: 0,
    pageSize: 20,
};

const Tasks = (state = initialState, { type, payload, data }) => {
    switch (type) {
        case FETCH_BATCH_TASK_REQUEST:
            return {
                ...state,
                data: null,
                loading: true,
                error: null,
            };
        case FETCH_BATCH_TASK_SUCCESS:
            return {
                ...state,
                ...data.data,
                loading: false,
                error: null,
            };
        case FETCH_BATCH_TASK_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case SET_BATCH_TASK_DETAILS:
        case SET_BATCH_TASK_PAGE_INDEX:
        case SET_BATCH_TASK_PAGE_SIZE:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        default:
            return {
                ...state,
                loading: true,
                error: null,
            };
    }
};

export default Tasks;
