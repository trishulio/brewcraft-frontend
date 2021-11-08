import {
    FETCH_MIXTURE_RECORDING_BY_ID_REQUEST,
    FETCH_MIXTURE_RECORDING_BY_BREW_ID_REQUEST,
    FETCH_TRANSFER_MIXTURE_RECORDING_BY_MIXTURE_ID_REQUEST,
    SET_TRANSFER_MIXTURE_RECORDING_DETAILS,
    ADD_TRANSFER_MIXTURE_RECORDING_REQUEST,
    EDIT_TRANSFER_MIXTURE_RECORDING_REQUEST,
    DELETE_TRANSFER_MIXTURE_RECORDING_REQUEST,
    RESET_TRANSFER_MIXTURE_RECORDING_DETAILS,
    FETCH_FERMENT_MIXTURE_RECORDING_BY_MIXTURE_ID_REQUEST,
    SET_FERMENT_MIXTURE_RECORDING_DETAILS,
    ADD_FERMENT_MIXTURE_RECORDING_REQUEST,
    EDIT_FERMENT_MIXTURE_RECORDING_REQUEST,
    DELETE_FERMENT_MIXTURE_RECORDING_REQUEST,
    RESET_FERMENT_MIXTURE_RECORDING_DETAILS,
} from "./actionTypes";

export const fetchTransferMixtureRecordsById = id => ({
    type: FETCH_MIXTURE_RECORDING_BY_ID_REQUEST,
    payload: { id },
});

export const fetchMixtureRecordingsByBrewId = id => ({
    type: FETCH_MIXTURE_RECORDING_BY_BREW_ID_REQUEST,
    payload: { id }
});

export const fetchTransferMixtureRecordsByMixtureId = id => ({
    type: FETCH_TRANSFER_MIXTURE_RECORDING_BY_MIXTURE_ID_REQUEST,
    payload: { id },
});

export const setTransferMixtureRecords = payload => ({
    type: SET_TRANSFER_MIXTURE_RECORDING_DETAILS,
    payload: payload
});

export const resetTransferMixtureRecordsDetails = () => ({
    type: RESET_TRANSFER_MIXTURE_RECORDING_DETAILS,
    payload: null
});

export const saveTransferMixtureRecords = payload => ({
    type: ADD_TRANSFER_MIXTURE_RECORDING_REQUEST,
    payload: payload,
});

export const editTransferMixtureRecords = payload => ({
    type: EDIT_TRANSFER_MIXTURE_RECORDING_REQUEST,
    payload: payload,
});

export const deleteTransferMixtureRecords = payload => ({
    type: DELETE_TRANSFER_MIXTURE_RECORDING_REQUEST,
    payload: payload,
});

export const fetchFermentMixtureRecordsByMixtureId = id => ({
    type: FETCH_FERMENT_MIXTURE_RECORDING_BY_MIXTURE_ID_REQUEST,
    payload: { id },
});

export const setFermentMixtureRecords = payload => ({
    type: SET_FERMENT_MIXTURE_RECORDING_DETAILS,
    payload: payload
});

export const resetFermentMixtureRecordsDetails = () => ({
    type: RESET_FERMENT_MIXTURE_RECORDING_DETAILS,
    payload: null
});

export const saveFermentMixtureRecords = payload => ({
    type: ADD_FERMENT_MIXTURE_RECORDING_REQUEST,
    payload: payload,
});

export const editFermentMixtureRecords = payload => ({
    type: EDIT_FERMENT_MIXTURE_RECORDING_REQUEST,
    payload: payload,
});

export const deleteFermentMixtureRecords = payload => ({
    type: DELETE_FERMENT_MIXTURE_RECORDING_REQUEST,
    payload: payload,
});