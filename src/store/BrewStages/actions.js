import {
    FETCH_BREW_STAGES_REQUEST,
    EDIT_BREW_STAGES_REQUEST,
    SET_BREW_STAGES,
    ADD_BREW_STAGE_REQUEST,
    DELETE_BREW_STAGE_REQUEST,
} from "./actionTypes";

export const fetchBrewStages = (id) => ({
    type: FETCH_BREW_STAGES_REQUEST,
    payload: { id },
});

export const addBrewStage = ({ parentMixtureIds, form }) => ({
    type: ADD_BREW_STAGE_REQUEST,
    payload: { parentMixtureIds, form },
});

export const editBrewStages = ({ id, form }) => ({
    type: EDIT_BREW_STAGES_REQUEST,
    payload: {
        id,
        form: { ...form },
    },
});

export const deleteBrewStage = (stage) => ({
    type: DELETE_BREW_STAGE_REQUEST,
    payload: { stage },
});

export const setBrewStageDetails = (payload) => ({
    type: SET_BREW_STAGES,
    payload: {
        ...payload,
    },
});
