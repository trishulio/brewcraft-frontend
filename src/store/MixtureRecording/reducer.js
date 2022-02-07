import KettleMixtureRecordings from "./kettle";
import WhirlpoolMixtureRecordings from "./whirlpool";
import TransferMixtureRecordings from "./transfer";
import FermentMixtureRecordings from "./ferment";
import {
    FETCH_MIXTURE_RECORDINGS_BY_BREW_ID_REQUEST,
    FETCH_MIXTURE_RECORDINGS_BY_BREW_ID_SUCCESS,
    FETCH_MIXTURE_RECORDINGS_BY_BREW_ID_FAILURE,
    SET_BREW_MIXTURE_RECORDINGS,
    RESET_BREW_MIXTURE_RECORDINGS,
} from "./actionTypes";

const initialState = {
    content: [],
    initial: [],
    loading: true,
    error: false,
};
const MixtureRecordings = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_MIXTURE_RECORDINGS_BY_BREW_ID_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_MIXTURE_RECORDINGS_BY_BREW_ID_SUCCESS:
        case SET_BREW_MIXTURE_RECORDINGS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case FETCH_MIXTURE_RECORDINGS_BY_BREW_ID_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case RESET_BREW_MIXTURE_RECORDINGS:
            return {
                ...initialState,
                loading: false,
                error: null,
            };
        default:
            return {
                ...state,
                loading: false,
            };
    }
};

export {
    MixtureRecordings,
    KettleMixtureRecordings,
    WhirlpoolMixtureRecordings,
    TransferMixtureRecordings,
    FermentMixtureRecordings,
};
