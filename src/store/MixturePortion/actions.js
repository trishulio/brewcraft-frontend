import {
    FETCH_MIXTURE_PORTION_BY_ID_REQUEST,
    FETCH_MIXTURE_PORTION_BY_BREW_ID_REQUEST,
    FETCH_TRANSFER_MIXTURE_PORTION_BY_MIXTURE_ID_REQUEST,
    SET_TRANSFER_MIXTURE_PORTION_DETAILS,
    ADD_TRANSFER_MIXTURE_PORTION_REQUEST,
    EDIT_TRANSFER_MIXTURE_PORTION_REQUEST,
    DELETE_TRANSFER_MIXTURE_PORTION_REQUEST,
    RESET_TRANSFER_MIXTURE_PORTION_DETAILS,
    FETCH_KETTLE_MIXTURE_PORTION_BY_MIXTURE_ID_REQUEST,
    SET_KETTLE_MIXTURE_PORTION_DETAILS,
    ADD_KETTLE_MIXTURE_PORTION_REQUEST,
    EDIT_KETTLE_MIXTURE_PORTION_REQUEST,
    DELETE_KETTLE_MIXTURE_PORTION_REQUEST,
    RESET_KETTLE_MIXTURE_PORTION_DETAILS,
    FETCH_WHIRLPOOL_MIXTURE_PORTION_BY_MIXTURE_ID_REQUEST,
    SET_WHIRLPOOL_MIXTURE_PORTION_DETAILS,
    ADD_WHIRLPOOL_MIXTURE_PORTION_REQUEST,
    EDIT_WHIRLPOOL_MIXTURE_PORTION_REQUEST,
    DELETE_WHIRLPOOL_MIXTURE_PORTION_REQUEST,
    RESET_WHIRLPOOL_MIXTURE_PORTION_DETAILS,
    FETCH_FERMENT_MIXTURE_PORTION_BY_MIXTURE_ID_REQUEST,
    SET_FERMENT_MIXTURE_PORTION_DETAILS,
    ADD_FERMENT_MIXTURE_PORTION_REQUEST,
    EDIT_FERMENT_MIXTURE_PORTION_REQUEST,
    DELETE_FERMENT_MIXTURE_PORTION_REQUEST,
    RESET_FERMENT_MIXTURE_PORTION_DETAILS,
} from "./actionTypes";

export const fetchTransferMixturePortionsById = (id) => ({
    type: FETCH_MIXTURE_PORTION_BY_ID_REQUEST,
    payload: { id },
});

export const fetchMixturePortionsByBrewId = (id) => ({
    type: FETCH_MIXTURE_PORTION_BY_BREW_ID_REQUEST,
    payload: { id },
});

export const fetchTransferMixturePortionsByMixtureId = (id) => ({
    type: FETCH_TRANSFER_MIXTURE_PORTION_BY_MIXTURE_ID_REQUEST,
    payload: { id },
});

export const setTransferMixturePortions = (payload) => ({
    type: SET_TRANSFER_MIXTURE_PORTION_DETAILS,
    payload: payload,
});

export const resetTransferMixturePortionsDetails = () => ({
    type: RESET_TRANSFER_MIXTURE_PORTION_DETAILS,
    payload: null,
});

export const saveTransferMixturePortions = (payload) => ({
    type: ADD_TRANSFER_MIXTURE_PORTION_REQUEST,
    payload: payload,
});

export const editTransferMixturePortions = (payload) => ({
    type: EDIT_TRANSFER_MIXTURE_PORTION_REQUEST,
    payload: payload,
});

export const deleteTransferMixturePortions = (payload) => ({
    type: DELETE_TRANSFER_MIXTURE_PORTION_REQUEST,
    payload: payload,
});

export const fetchKettleMixturePortionsByMixtureId = (id) => ({
    type: FETCH_KETTLE_MIXTURE_PORTION_BY_MIXTURE_ID_REQUEST,
    payload: { id },
});

export const setKettleMixturePortions = (payload) => ({
    type: SET_KETTLE_MIXTURE_PORTION_DETAILS,
    payload: payload,
});

export const resetKettleMixturePortionsDetails = () => ({
    type: RESET_KETTLE_MIXTURE_PORTION_DETAILS,
    payload: null,
});

export const saveKettleMixturePortions = (payload) => ({
    type: ADD_KETTLE_MIXTURE_PORTION_REQUEST,
    payload: payload,
});

export const editKettleMixturePortions = (payload) => ({
    type: EDIT_KETTLE_MIXTURE_PORTION_REQUEST,
    payload: payload,
});

export const deleteKettleMixturePortions = (payload) => ({
    type: DELETE_KETTLE_MIXTURE_PORTION_REQUEST,
    payload: payload,
});

export const fetchWhirlpoolMixturePortionsByMixtureId = (id) => ({
    type: FETCH_WHIRLPOOL_MIXTURE_PORTION_BY_MIXTURE_ID_REQUEST,
    payload: { id },
});

export const setWhirlpoolMixturePortions = (payload) => ({
    type: SET_WHIRLPOOL_MIXTURE_PORTION_DETAILS,
    payload: payload,
});

export const resetWhirlpoolMixturePortionsDetails = () => ({
    type: RESET_WHIRLPOOL_MIXTURE_PORTION_DETAILS,
    payload: null,
});

export const saveWhirlpoolMixturePortions = (payload) => ({
    type: ADD_WHIRLPOOL_MIXTURE_PORTION_REQUEST,
    payload: payload,
});

export const editWhirlpoolMixturePortions = (payload) => ({
    type: EDIT_WHIRLPOOL_MIXTURE_PORTION_REQUEST,
    payload: payload,
});

export const deleteWhirlpoolMixturePortions = (payload) => ({
    type: DELETE_WHIRLPOOL_MIXTURE_PORTION_REQUEST,
    payload: payload,
});

export const fetchFermentMixturePortionsByMixtureId = (id) => ({
    type: FETCH_FERMENT_MIXTURE_PORTION_BY_MIXTURE_ID_REQUEST,
    payload: { id },
});

export const setFermentMixturePortions = (payload) => ({
    type: SET_FERMENT_MIXTURE_PORTION_DETAILS,
    payload: payload,
});

export const resetFermentMixturePortionsDetails = () => ({
    type: RESET_FERMENT_MIXTURE_PORTION_DETAILS,
    payload: null,
});

export const saveFermentMixturePortions = (payload) => ({
    type: ADD_FERMENT_MIXTURE_PORTION_REQUEST,
    payload: payload,
});

export const editFermentMixturePortions = (payload) => ({
    type: EDIT_FERMENT_MIXTURE_PORTION_REQUEST,
    payload: payload,
});

export const deleteFermentMixturePortions = (payload) => ({
    type: DELETE_FERMENT_MIXTURE_PORTION_REQUEST,
    payload: payload,
});
