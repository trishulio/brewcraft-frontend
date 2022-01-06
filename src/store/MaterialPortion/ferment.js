import {
    ADD_FERMENT_MATERIAL_PORTION_REQUEST,
    ADD_FERMENT_MATERIAL_PORTION_FAILURE,
    EDIT_FERMENT_MATERIAL_PORTION_REQUEST,
    EDIT_FERMENT_MATERIAL_PORTION_SUCCESS,
    ADD_FERMENT_MATERIAL_PORTION_SUCCESS,
    SET_FERMENT_MATERIAL_PORTION_DETAILS,
    RESET_FERMENT_MATERIAL_PORTION_DETAILS,
    EDIT_FERMENT_MATERIAL_PORTION_FAILURE,
    DELETE_FERMENT_MATERIAL_PORTION_FAILURE,
} from "./actionTypes";

const initialState = {
    content: [],
    initial: [],
    totalElements: 0,
    totalPages: 0,
    pageIndex: 0,
    pageSize: 20,
    loading: true,
    error: null,
};

const FermentMaterialPortion = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_FERMENT_MATERIAL_PORTION_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
            };
        case ADD_FERMENT_MATERIAL_PORTION_REQUEST:
        case EDIT_FERMENT_MATERIAL_PORTION_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ADD_FERMENT_MATERIAL_PORTION_SUCCESS:
        case EDIT_FERMENT_MATERIAL_PORTION_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case ADD_FERMENT_MATERIAL_PORTION_FAILURE:
        case EDIT_FERMENT_MATERIAL_PORTION_FAILURE:
        case DELETE_FERMENT_MATERIAL_PORTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case RESET_FERMENT_MATERIAL_PORTION_DETAILS:
            return {
                ...initialState,
                loading: false,
                error: null,
            };
        default:
            return {
                ...state,
                loading: false,
                error: null,
            };
    }
};

export default FermentMaterialPortion;
