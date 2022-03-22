import {
    FETCH_BATCH_STAGES_REQUEST,
    SET_BATCH_STAGES,
    DELETE_BREW_STAGE_REQUEST,
} from "./actionTypes";

export const fetchBrewStages = (id) => ({
    type: FETCH_BATCH_STAGES_REQUEST,
    payload: { id },
});

export const deleteBrewStage = (stage) => ({
    type: DELETE_BREW_STAGE_REQUEST,
    payload: { stage },
});

export const setBrewStageDetails = (payload) => ({
    type: SET_BATCH_STAGES,
    payload: {
        ...payload,
    },
});
