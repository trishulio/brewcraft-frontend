import {
    FETCH_MIXTURE_RECORDING_BY_ID_REQUEST,
    FETCH_MIXTURE_RECORDING_BY_BREW_ID_REQUEST,
    FETCH_MIXTURE_RECORDING_BY_MIXTURE_ID_REQUEST,
    SET_MIXTURE_RECORDING_DETAILS,
    ADD_MIXTURE_RECORDING_REQUEST,
    EDIT_MIXTURE_RECORDING_REQUEST,
    DELETE_MIXTURE_RECORDING_REQUEST,
    RESET_MIXTURE_RECORDING_DETAILS,
} from "./actionTypes";

export const fetchTransferMixtureRecordsById = id => ({
    type: FETCH_MIXTURE_RECORDING_BY_ID_REQUEST,
    payload: { id },
});

export const fetchTransferMixtureRecordsByMixtureId = id => ({
    type: FETCH_MIXTURE_RECORDING_BY_MIXTURE_ID_REQUEST,
    payload: { id },
});

export const fetchMixtureRecordingsByBrewId = id => ({
    type: FETCH_MIXTURE_RECORDING_BY_BREW_ID_REQUEST,
    payload: { id }
})

export const setTransferMixtureRecords = payload => ({
    type: SET_MIXTURE_RECORDING_DETAILS,
    payload: payload
});

export const resetTransferMixtureRecordsDetails = () => ({
    type: RESET_MIXTURE_RECORDING_DETAILS,
    payload: null
});

export const saveTransferMixtureRecords = payload => ({
    type: ADD_MIXTURE_RECORDING_REQUEST,
    payload: payload,
});

export const editTransferMixtureRecords = payload => ({
    type: EDIT_MIXTURE_RECORDING_REQUEST,
    payload: payload,
});

export const deleteTransferMixtureRecords = payload => ({
    type: DELETE_MIXTURE_RECORDING_REQUEST,
    payload: payload,
});
