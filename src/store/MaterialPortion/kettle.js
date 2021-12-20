import {
    ADD_KETTLE_MATERIAL_PORTION_REQUEST,
    ADD_KETTLE_MATERIAL_PORTION_FAILURE,
    EDIT_KETTLE_MATERIAL_PORTION_REQUEST,
    EDIT_KETTLE_MATERIAL_PORTION_SUCCESS,
    ADD_KETTLE_MATERIAL_PORTION_SUCCESS,
    SET_KETTLE_MATERIAL_PORTION_DETAILS,
    RESET_KETTLE_MATERIAL_PORTION_DETAILS,
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

const KettleMaterialPortion = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_KETTLE_MATERIAL_PORTION_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case ADD_KETTLE_MATERIAL_PORTION_REQUEST:
        case EDIT_KETTLE_MATERIAL_PORTION_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ADD_KETTLE_MATERIAL_PORTION_SUCCESS:
        case EDIT_KETTLE_MATERIAL_PORTION_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case ADD_KETTLE_MATERIAL_PORTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case RESET_KETTLE_MATERIAL_PORTION_DETAILS:
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

export default KettleMaterialPortion;
