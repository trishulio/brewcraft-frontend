import {
    SET_BATCH_DETAILS,
    ADD_BATCH_REQUEST,
    EDIT_BATCH_REQUEST,
    DELETE_BATCH_REQUEST,
    RESET_BATCH_DETAILS,
    SET_BATCH_INVALID_NAME,
    SET_BATCH_INVALID_PARENT_BREW,
    SET_BATCH_INVALID_PRODUCT,
    SET_BATCH_INVALID_STARTED_AT,
    SET_BATCH_INVALID_ENDED_AT,
    SET_BATCH_INVALID_DESCRIPTION,
    FETCH_BATCH_REQUEST,
} from "./actionTypes";

export const fetchBatch = ({ batchId }) => ({
    type: FETCH_BATCH_REQUEST,
    payload: { batchId },
});

export const setBatchDetails = (payload) => ({
    type: SET_BATCH_DETAILS,
    payload: payload,
});

export const resetBatchDetails = () => ({
    type: RESET_BATCH_DETAILS,
    payload: null,
});

export const addBatch = (batch) => ({
    type: ADD_BATCH_REQUEST,
    payload: {
        batch,
    },
});

export const editBatch = (payload) => ({
    type: EDIT_BATCH_REQUEST,
    payload: payload,
});

export const deleteBatch = (id) => ({
    type: DELETE_BATCH_REQUEST,
    payload: { id },
});

export const setBatchInvalidName = (value) => ({
    type: SET_BATCH_INVALID_NAME,
    payload: {
        invalidName: value,
    },
});

export const setBatchInvalidBatchId = (value) => ({
    type: SET_BATCH_INVALID_NAME,
    payload: {
        invalidBatchId: value,
    },
});

export const setBatchInvalidParentBrew = (value) => ({
    type: SET_BATCH_INVALID_PARENT_BREW,
    payload: {
        invalidParentBrew: value,
    },
});

export const setBatchInvalidProduct = (value) => ({
    type: SET_BATCH_INVALID_PRODUCT,
    payload: {
        invalidProduct: value,
    },
});

export const setBatchInvalidStartedAt = (value) => ({
    type: SET_BATCH_INVALID_STARTED_AT,
    payload: {
        invalidStartedAt: value,
    },
});

export const setBatchInvalidEndedAt = (value) => ({
    type: SET_BATCH_INVALID_ENDED_AT,
    payload: {
        invalidEndedAt: value,
    },
});

export const setBatchInvalidDescription = (value) => ({
    type: SET_BATCH_INVALID_DESCRIPTION,
    payload: {
        invalidDescription: value,
    },
});
