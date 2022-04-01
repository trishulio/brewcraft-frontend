import {
    FETCH_BATCH_MATERIAL_PORTIONS_FAILURE,
    FETCH_BATCH_MATERIAL_PORTIONS_REQUEST,
    FETCH_BATCH_MATERIAL_PORTIONS_SUCCESS,
    RESET_BATCH_MATERIAL_PORTIONS,
    SET_BATCH_MATERIAL_PORTIONS,
} from "./actionTypes";

const initialState = {
    content: [],
    initial: [],
    loading: true,
    error: false,
};
const MaterialPortions = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_BATCH_MATERIAL_PORTIONS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_BATCH_MATERIAL_PORTIONS_SUCCESS:
        case SET_BATCH_MATERIAL_PORTIONS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case FETCH_BATCH_MATERIAL_PORTIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case RESET_BATCH_MATERIAL_PORTIONS:
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

export { MaterialPortions };
