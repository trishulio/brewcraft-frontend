import {
    CREATE_FINISHED_GOOD,
    FETCH_FINISHED_GOOD,
    UPDATE_FINISHED_GOOD,
    SET_FINISHED_GOOD_DETAILS,
    INVALID_NAME,
    INVALID_CLASS,
    INVALID_TYPE,
    INVALID_STYLE,
    INVALID_DESCRIPTION,
    RESET_FINISHED_GOOD_DETAILS,
    DELETE_FINISHED_GOOD
} from "./actionTypes";

export const setFinishedGoodDetails = finishedGood => ({
    type: SET_FINISHED_GOOD_DETAILS,
    payload: {
        data: finishedGood
    }
});

export const fetchFinishedGoodById = (id) => ({
    type: FETCH_FINISHED_GOOD,
    payload: { id }
});

export const createFinishedGood = params => ({
    type: CREATE_FINISHED_GOOD,
    payload: {
        ...params
    }
});

export const updateFinishedGood = ({data, categoryId, success}) => ({
    type: UPDATE_FINISHED_GOOD,
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

export const deleteFinishedGood = (id) => ({
    type: DELETE_FINISHED_GOOD,
    payload: { id }
});

export const setFinishedGoodInvalidName = enabled => ({
    type: INVALID_NAME,
    payload: {
        invalidName: enabled
    }
});

export const setFinishedGoodInvalidClass = enabled => ({
    type: INVALID_CLASS,
    payload: {
        invalidClass: enabled
    }
});

export const setFinishedGoodInvalidType = enabled => ({
    type: INVALID_TYPE,
    payload: {
        invalidType: enabled
    }
});

export const setFinishedGoodInvalidStyle = enabled => ({
    type: INVALID_STYLE,
    payload: {
        invalidStyle: enabled
    }
});

export const setFinishedGoodInvalidDescription = enabled => ({
    type: INVALID_DESCRIPTION,
    payload: {
        invalidDescription: enabled
    }
});

export const resetFinishedGoodDetails = success => ({
    type: RESET_FINISHED_GOOD_DETAILS,
    payload: success
});
