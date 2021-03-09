import {
    FETCH_COMPANIES_REQUEST,
    FETCH_COMPANIES_SUCCESS,
    FETCH_COMPANIES_FAILURE
} from "./actionTypes";

const Company = (state = {}, { type, payload }) => {
    switch (type) {
        case FETCH_COMPANIES_REQUEST:
        return {
            ...state,
            loading: true
        }
        case FETCH_COMPANIES_SUCCESS:
        case FETCH_COMPANIES_FAILURE:
        return {
            ...state,
            companies: { ...payload },
            loading: false
        }
        default:
        state = { ...state };
        break;
    }
    return state;
};

export default Company;