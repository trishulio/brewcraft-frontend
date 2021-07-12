import {
    CREATE_BATCH,
    FETCH_BATCH,
    UPDATE_BATCH,
    SET_BATCH_DETAILS,
    INVALID_NAME,
    INVALID_DESCRIPTION,
    RESET_BATCH_DETAILS,
    DELETE_BATCH
} from "./actionTypes";

export const setBatchDetails = batch => ({
    type: SET_BATCH_DETAILS,
    payload: {
        data: batch
    }
});

export const fetchBatchById = ({id, success}) => ({
    type: FETCH_BATCH,
    payload: { id, success }
});

export const createBatch = ({data, categoryId, success}) => ({
    type: CREATE_BATCH,
    payload: {
        form: {
            name: data.name,
            description: data.description || "",
            categoryId: categoryId
        },
        success: success
    }
});

export const updateBatch = ({data, categoryId, success}) => ({
    type: UPDATE_BATCH,
    payload: {
        id: data.id,
        form: {
            name: data.name,
            description: data.description || "",
            categoryId: categoryId,
            version: data.version
        },
        success: success
    }
});

export const deleteBatch = ({ id, success}) => ({
    type: DELETE_BATCH,
    payload: { id, success }
});

export const setInvalidName = enabled => ({
    type: INVALID_NAME,
    payload: {
        invalidName: enabled
    }
});

export const setInvalidDescription = enabled => ({
    type: INVALID_DESCRIPTION,
    payload: {
        invalidDescription: enabled
    }
});

export const resetBatchDetails = success => ({
    type: RESET_BATCH_DETAILS,
    payload: success
});