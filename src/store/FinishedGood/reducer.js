import {
    INVALID_SKU,
    INVALID_MATERIAL_PORTIONS,
    INVALID_MIXTURE_PORTIONS,
    INVALID_FINISHED_GOOD_LOT_PORTIONS,
    INVALID_QUANTITY,
    INVALID_PACKAGED_ON,
    SET_FINISHED_GOOD_DETAILS,
    SET_FINISHED_GOOD_DETAILS_ERROR,
    RESET_FINISHED_GOOD_DETAILS,
} from "./actionTypes";

const initialState = {
    data: {
        id: null,
        sku: null,
        mixturePortions: [],
        materialPortions: [],
        finishedGoodLotPortions: [],
        quantity: null,
        packagedOn: null,
        version: null,
    },
    initialFinishedGood: {
        id: null,
        sku: null,
        mixturePortions: [],
        materialPortions: [],
        finishedGoodLotPortions: [],
        quantity: null,
        packagedOn: null,
        version: null,
    },
    invalidSku: false,
    invalidMaterialPortion: false,
    invalidMixturePortion: false,
    invalidFinishedGoodLotPortions: false,
    invalidQuantity: false,
    invalidPackagedOn: false,
    loading: true,
    error: null,
};

const FinishedGood = (state = initialState, { type, payload }) => {
    switch (type) {
        case INVALID_SKU:
            return {
                ...state,
                invalidSku: payload,
                loading: false,
                error: true,
            };
        case INVALID_MATERIAL_PORTIONS:
            return {
                ...state,
                invalidMaterialPortions: payload,
                loading: false,
                error: true,
            };
        case INVALID_MIXTURE_PORTIONS:
            return {
                ...state,
                invalidMixturePortions: payload,
                loading: false,
                error: true,
            };
        case INVALID_FINISHED_GOOD_LOT_PORTIONS:
            return {
                ...state,
                invalidFinishedGoodLotPortions: payload,
                loading: false,
                error: true,
            };
        case INVALID_QUANTITY:
            return {
                ...state,
                invalidQuantity: payload,
                loading: false,
                error: true,
            };
        case INVALID_PACKAGED_ON:
            return {
                ...state,
                invalidPackagedOn: payload,
                loading: false,
                error: true,
            };
        case SET_FINISHED_GOOD_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case SET_FINISHED_GOOD_DETAILS_ERROR:
            return {
                ...state,
                ...payload,
                loading: false,
                error: true,
            };
        case RESET_FINISHED_GOOD_DETAILS:
            return {
                ...initialState,
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

export default FinishedGood;
