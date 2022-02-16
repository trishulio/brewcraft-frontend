import {
    CREATE_FINISHED_GOOD,
    FETCH_FINISHED_GOOD,
    UPDATE_FINISHED_GOOD,
    SET_FINISHED_GOOD_DETAILS,
    SET_FINISHED_GOOD_DETAILS_ERROR,
    INVALID_SKU,
    INVALID_MATERIAL_PORTIONS,
    INVALID_MIXTURE_PORTIONS,
    INVALID_FINISHED_GOOD_LOT_PORTIONS,
    INVALID_QUANTITY,
    INVALID_PACKAGED_ON,
    RESET_FINISHED_GOOD_DETAILS,
    DELETE_FINISHED_GOOD,
} from "./actionTypes";

export const setFinishedGoodDetails = (payload) => ({
    type: SET_FINISHED_GOOD_DETAILS,
    payload,
});

export const fetchFinishedGoodById = (id) => ({
    type: FETCH_FINISHED_GOOD,
    payload: { id },
});

export const createFinishedGood = (payload) => ({
    type: CREATE_FINISHED_GOOD,
    payload,
});

export const updateFinishedGood = (payload) => ({
    type: UPDATE_FINISHED_GOOD,
    payload,
});

export const deleteFinishedGood = (id) => ({
    type: DELETE_FINISHED_GOOD,
    payload: { id },
});

export const setFinishedGoodInvalidSku = (value) => ({
    type: INVALID_SKU,
    payload: value,
});

export const setFinishedGoodInvalidMaterialPortions = (value) => ({
    type: INVALID_MATERIAL_PORTIONS,
    payload: value,
});

export const setFinishedGoodInvalidMixturePortions = (value) => ({
    type: INVALID_MIXTURE_PORTIONS,
    payload: value,
});

export const setFinishedGoodInvalidFinishedGoodLotPortions = (value) => ({
    type: INVALID_FINISHED_GOOD_LOT_PORTIONS,
    payload: value,
});

export const setFinishedGoodInvalidQuantity = (value) => ({
    type: INVALID_QUANTITY,
    payload: value,
});

export const setFinishedGoodInvalidPackagedOn = (value) => ({
    type: INVALID_PACKAGED_ON,
    payload: value,
});

export const setFinishedGoodDetailsError = (error) => ({
    type: SET_FINISHED_GOOD_DETAILS_ERROR,
    payload: {
        ...error,
    },
});

export const resetFinishedGoodDetails = () => ({
    type: RESET_FINISHED_GOOD_DETAILS,
    payload: null,
});
