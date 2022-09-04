import {
    DELETE_BATCH_MATERIAL_PORTIONS_REQUEST,
    EDIT_BATCH_MATERIAL_PORTIONS,
    FETCH_BATCH_MATERIAL_PORTIONS_REQUEST,
    SET_BATCH_MATERIAL_PORTIONS,
} from "./actionTypes";

export const fetchBrewMaterialPortions = ({ batchId }) => ({
    type: FETCH_BATCH_MATERIAL_PORTIONS_REQUEST,
    payload: { batchId },
});

export const setBrewMaterialPortions = ({ content }) => ({
    type: SET_BATCH_MATERIAL_PORTIONS,
    payload: {
        content,
    },
});

export const editBrewMaterialPortions = (payload) => ({
    type: EDIT_BATCH_MATERIAL_PORTIONS,
    payload: { ...payload },
});

export const deleteBrewMaterialPortions = (payload) => ({
    type: DELETE_BATCH_MATERIAL_PORTIONS_REQUEST,
    payload: { ...payload },
});

export const setBatchNotSave = ({ content }) => ({
    type: SET_BATCH_MATERIAL_PORTIONS,
    payload: {
        content,
    },
});
