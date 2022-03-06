import {
    FETCH_BREW_MATERIAL_PORTIONS_BY_BREW_ID_FAILURE,
    FETCH_BREW_MATERIAL_PORTIONS_BY_BREW_ID_REQUEST,
    FETCH_BREW_MATERIAL_PORTIONS_BY_BREW_ID_SUCCESS,
    RESET_BREW_MATERIAL_PORTIONS,
    SET_BREW_MATERIAL_PORTIONS,
} from "./actionTypes";

const initialState = {
    content: [],
    initial: [],
    loading: true,
    error: false,
};
const MaterialPortions = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_BREW_MATERIAL_PORTIONS_BY_BREW_ID_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_BREW_MATERIAL_PORTIONS_BY_BREW_ID_SUCCESS:
        case SET_BREW_MATERIAL_PORTIONS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case FETCH_BREW_MATERIAL_PORTIONS_BY_BREW_ID_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case RESET_BREW_MATERIAL_PORTIONS:
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
