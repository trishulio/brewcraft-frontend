import {
    SET_TRANSFER_MIXTURE_RECORDING_DETAILS,
    RESET_TRANSFER_MIXTURE_RECORDING_DETAILS,
    SET_KETTLE_MIXTURE_RECORDING_DETAILS,
    RESET_KETTLE_MIXTURE_RECORDING_DETAILS,
    SET_WHIRLPOOL_MIXTURE_RECORDING_DETAILS,
    RESET_WHIRLPOOL_MIXTURE_RECORDING_DETAILS,
    SET_FERMENT_MIXTURE_RECORDING_DETAILS,
    RESET_FERMENT_MIXTURE_RECORDING_DETAILS,
    SET_BREW_MIXTURE_RECORDINGS,
    EDIT_BREW_MIXTURE_RECORDINGS_REQUEST,
    DELETE_BREW_MIXTURE_RECORDINGS_REQUEST,
    FETCH_MIXTURE_RECORDINGS_BY_BREW_ID_REQUEST,
} from "./actionTypes";

export const fetchMixtureRecordingsByBrewId = (id) => ({
    type: FETCH_MIXTURE_RECORDINGS_BY_BREW_ID_REQUEST,
    payload: { id },
});

export const setBrewMixtureRecordings = (payload) => ({
    type: SET_BREW_MIXTURE_RECORDINGS,
    payload: payload,
});

export const saveBrewMixtureRecordings = (mixtureRecordings) => ({
    type: EDIT_BREW_MIXTURE_RECORDINGS_REQUEST,
    payload: {
        mixtureRecordings,
    },
});

export const deleteBrewMixtureRecordings = (mixtureRecordings) => ({
    type: DELETE_BREW_MIXTURE_RECORDINGS_REQUEST,
    payload: {
        mixtureRecordings,
    },
});

export const setTransferMixtureRecords = (payload) => ({
    type: SET_TRANSFER_MIXTURE_RECORDING_DETAILS,
    payload: payload,
});

export const resetTransferMixtureRecordsDetails = () => ({
    type: RESET_TRANSFER_MIXTURE_RECORDING_DETAILS,
    payload: null,
});

export const setKettleMixtureRecords = (payload) => ({
    type: SET_KETTLE_MIXTURE_RECORDING_DETAILS,
    payload: payload,
});

export const resetKettleMixtureRecordsDetails = () => ({
    type: RESET_KETTLE_MIXTURE_RECORDING_DETAILS,
    payload: null,
});

export const setWhirlpoolMixtureRecords = (payload) => ({
    type: SET_WHIRLPOOL_MIXTURE_RECORDING_DETAILS,
    payload: payload,
});

export const resetWhirlpoolMixtureRecordsDetails = () => ({
    type: RESET_WHIRLPOOL_MIXTURE_RECORDING_DETAILS,
    payload: null,
});

export const setFermentMixtureRecords = (payload) => ({
    type: SET_FERMENT_MIXTURE_RECORDING_DETAILS,
    payload: payload,
});

export const resetFermentMixtureRecordsDetails = () => ({
    type: RESET_FERMENT_MIXTURE_RECORDING_DETAILS,
    payload: null,
});
