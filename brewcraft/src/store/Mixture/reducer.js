import {
    ADD_MIXTURE_REQUEST,
    ADD_MIXTURE_FAILURE,
    EDIT_MIXTURE_REQUEST,
    EDIT_MIXTURE_SUCCESS,
    ADD_MIXTURE_SUCCESS,
    SET_MIXTURE_DETAILS,
    RESET_MIXTURE_DETAILS
} from "./actionTypes";

const initialState = {
    content: [],
    // data: {
    //     id: "",
    //     parentMixtureId: "",
    //     quantity: {
    //         symbol: "",
    //         value: null
    //     },
    //     equipment: {},
    //     brewStage: {},
    //     version: null
    // },
    // initial: {
    //     id: "",
    //     parentMixtureId: "",
    //     quantity: {
    //         symbol: "",
    //         value: null
    //     },
    //     equipment: {},
    //     brewStage: {},
    //     version: null
    // },
    totalElements: 0,
    totalPages: 0,
    pageIndex: 0,
    pageSize: 20,
    loading: true,
    error: null
};

const Mixture = (state = initialState, { type, payload } = {}) => {
    switch(type) {
        case SET_MIXTURE_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null
            };
        case ADD_MIXTURE_REQUEST:
        case EDIT_MIXTURE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ADD_MIXTURE_SUCCESS:
        case EDIT_MIXTURE_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null
            };
        case ADD_MIXTURE_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            };
        case RESET_MIXTURE_DETAILS:
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

export default Mixture;