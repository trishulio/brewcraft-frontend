import {
    ADD_MASH_MATERIAL_PORTION_REQUEST,
    ADD_MASH_MATERIAL_PORTION_FAILURE,
    EDIT_MASH_MATERIAL_PORTION_REQUEST,
    EDIT_MASH_MATERIAL_PORTION_SUCCESS,
    DELETE_MASH_MATERIAL_PORTION_REQUEST,
    DELETE_MASH_MATERIAL_PORTION_SUCCESS,
    ADD_MASH_MATERIAL_PORTION_SUCCESS,
    SET_MASH_MATERIAL_PORTION_DETAILS,
    RESET_MASH_MATERIAL_PORTION_DETAILS,
} from "./actionTypes";

const initialState = {
    content: [],
    // data: {
    //     id: "",
    //     materialLot: {
    //         id: "",
    //         lotNumber: "",
    //         invoiceItem: {},
    //         storage: {},
    //         createdAt: "",
    //         lastUpdated: "",
    //         version: 0,
    //         quantity: {}
    //     },
    //     quantity: {},
    //     addedAt: "",
    //     mixture: {},
    //     version: null,
    // },
    // content: [{
    //     id: 0,
    //     materialLot: {
    //         id: "",
    //         lotNumber: "",
    //         invoiceItem: {},
    //         storage: {},
    //         createdAt: "",
    //         lastUpdated: "",
    //         version: 0,
    //         quantity: {}
    //     },
    //     quantity: {},
    //     addedAt: "",
    //     mixture: {
    //         id: 0,
    //         parentMixtureId: 0,
    //         quantity: {},
    //         equipment: {},
    //         brewStage: {},
    //         version: null
    //     },
    //     version: null,
    // }],
    // initial: [{
    //     id: 0,
    //     materialLot: {
    //         id: "",
    //         lotNumber: "",
    //         invoiceItem: {},
    //         storage: {},
    //         createdAt: "",
    //         lastUpdated: "",
    //         version: 0,
    //         quantity: {}
    //     },
    //     quantity: {},
    //     addedAt: "",
    //     mixture: {
    //         id: 0,
    //         parentMixtureId: 0,
    //         quantity: {},
    //         equipment: {},
    //         brewStage: {},
    //         version: null
    //     },
    //     version: null,
    // }],
    totalElements: 0,
    totalPages: 0,
    pageIndex: 0,
    pageSize: 20,
    loading: true,
    error: null
};

const MashMaterialPortion = (state = initialState, { type, payload }) => {
    switch(type) {
        case SET_MASH_MATERIAL_PORTION_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null
            };
        case ADD_MASH_MATERIAL_PORTION_REQUEST:
        case EDIT_MASH_MATERIAL_PORTION_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ADD_MASH_MATERIAL_PORTION_SUCCESS:
        case EDIT_MASH_MATERIAL_PORTION_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null
            };
        case ADD_MASH_MATERIAL_PORTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            };
        case RESET_MASH_MATERIAL_PORTION_DETAILS:
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

export default MashMaterialPortion;