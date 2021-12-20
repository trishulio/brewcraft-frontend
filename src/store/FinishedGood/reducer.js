import {
    INVALID_NAME,
    INVALID_CLASS,
    INVALID_TYPE,
    INVALID_STYLE,
    INVALID_DESCRIPTION,
    SET_FINISHED_GOOD_DETAILS,
    RESET_FINISHED_GOOD_DETAILS,
} from "./actionTypes";

const initialState = {
    data: {
        id: null,
        name: "",
        description: "",
        finishedGoodClass: null,
        style: null,
        type: null,
        targetMeasures: [],
        version: null,
    },
    initialFinishedGood: {
        id: null,
        name: "",
        description: "",
        finishedGoodClass: null,
        style: null,
        type: null,
        targetMeasures: [],
        version: null,
    },
    status: null,
    color: "info",
    type: null,
    invalidName: false,
    invalidClass: false,
    invalidType: false,
    invalidStyle: false,
    invalidDescription: false,
    redirect: false,
    loading: true,
    error: null,
};

const FinishedGood = (state = initialState, { type, payload }) => {
    switch (type) {
        case INVALID_NAME:
        case INVALID_CLASS:
        case INVALID_TYPE:
        case INVALID_STYLE:
        case INVALID_DESCRIPTION:
        case SET_FINISHED_GOOD_DETAILS:
            return {
                ...state,
                ...payload,
                data: {
                    ...state.data,
                    ...payload.data,
                },
                redirect: state.redirect,
                loading: false,
                error: null,
            };
        case RESET_FINISHED_GOOD_DETAILS:
            return {
                ...initialState,
                redirect: state.redirect,
                loading: false,
                error: null,
            };
        default:
            return {
                ...state,
                redirect: false,
                loading: true,
                error: null,
            };
    }
};

export default FinishedGood;
