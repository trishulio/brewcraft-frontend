import {
    FETCH_MIXTURE_RECORDING_BY_ID_REQUEST,
    FETCH_MIXTURE_RECORDING_BY_MIXTURE_ID_REQUEST,
    SET_MIXTURE_RECORDING_DETAILS,
    ADD_MIXTURE_RECORDING_REQUEST,
    EDIT_MIXTURE_RECORDING_REQUEST,
    DELETE_MIXTURE_RECORDING_REQUEST,
    RESET_MIXTURE_RECORDING_DETAILS,
    SET_MIXTURE_RECORDING_INVALID_NAME,
    SET_MIXTURE_RECORDING_INVALID_CATEGORY
} from "./actionTypes";

export const fetchMixtureRecordingById = id => ({
    type: FETCH_MIXTURE_RECORDING_BY_ID_REQUEST,
    payload: { id },
});

export const fetchMixtureRecordingsByMixtureId = id => ({
    type: FETCH_MIXTURE_RECORDING_BY_MIXTURE_ID_REQUEST,
    payload: { id },
});

export const setMixtureRecordingDetails = payload => ({
    type: SET_MIXTURE_RECORDING_DETAILS,
    payload: payload
});

export const resetMixtureRecordingDetails = () => ({
    type: RESET_MIXTURE_RECORDING_DETAILS,
    payload: null
});

export const saveMixtureRecording = payload => ({
    type: ADD_MIXTURE_RECORDING_REQUEST,
    payload: payload,
});

export const editMixtureRecording = payload => ({
    type: EDIT_MIXTURE_RECORDING_REQUEST,
    payload: payload,
});

export const deleteMixtureRecording = payload => ({
    type: DELETE_MIXTURE_RECORDING_REQUEST,
    payload: payload,
});

export const setMixtureRecordingInvalidName = value => ({
    type: SET_MIXTURE_RECORDING_INVALID_NAME,
    payload: value
});

export const setMixtureRecordingInvalidCategory = value => ({
    type: SET_MIXTURE_RECORDING_INVALID_CATEGORY,
    payload: value
});

export const setMixtureRecordingInvalidBaseQuantityUnit = value => ({
    type: SET_MIXTURE_RECORDING_INVALID_CATEGORY,
    payload: value
});