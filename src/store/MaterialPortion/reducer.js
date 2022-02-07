import MashMaterialPortion from "./mash";
import KettleMaterialPortion from "./kettle";
import FermentMaterialPortion from "./ferment";
import {
    FETCH_MATERIAL_PORTIONS_BY_BREW_ID_REQUEST,
    FETCH_MATERIAL_PORTIONS_BY_BREW_ID_SUCCESS,
    FETCH_MATERIAL_PORTIONS_BY_BREW_ID_FAILURE,
    SET_BREW_MATERIAL_PORTIONS_DETAILS,
    RESET_BREW_MATERIAL_PORTIONS_DETAILS,
} from "./actionTypes";

const initialState = {
    content: [],
    initial: [],
    loading: true,
    error: false,
};
const MaterialPortions = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_MATERIAL_PORTIONS_BY_BREW_ID_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_MATERIAL_PORTIONS_BY_BREW_ID_SUCCESS:
        case SET_BREW_MATERIAL_PORTIONS_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case FETCH_MATERIAL_PORTIONS_BY_BREW_ID_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case RESET_BREW_MATERIAL_PORTIONS_DETAILS:
            return {
                ...initialState,
                loading: false,
                error: null,
            };
        default:
            return {
                ...state,
                loading: false,
            };
    }
};

export {
    MaterialPortions,
    MashMaterialPortion,
    KettleMaterialPortion,
    FermentMaterialPortion,
};
