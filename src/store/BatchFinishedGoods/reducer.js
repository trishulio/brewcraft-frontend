import {
    SET_BATCH_FINISHED_GOODS,
    RESET_BATCH_FINISHED_GOODS,
    EDIT_BATCH_FINISHED_GOODS,
    DELETE_BATCH_FINISHED_GOODS_REQUEST,
    FETCH_BATCH_FINISHED_GOODS_REQUEST,
    FETCH_BATCH_FINISHED_GOODS_SUCCESS,
    FETCH_BATCH_FINISHED_GOODS_FAILURE,
} from "./actionTypes";

const initialState = {
    content: [],
    initial: [],
    loading: true,
    error: false,
};
const BatchFinishedGoods = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_BATCH_FINISHED_GOODS_REQUEST:
        case EDIT_BATCH_FINISHED_GOODS:
        case DELETE_BATCH_FINISHED_GOODS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_BATCH_FINISHED_GOODS_SUCCESS:
        case SET_BATCH_FINISHED_GOODS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case FETCH_BATCH_FINISHED_GOODS_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case RESET_BATCH_FINISHED_GOODS:
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

export { BatchFinishedGoods };
