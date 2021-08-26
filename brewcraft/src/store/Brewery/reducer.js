import {
    SET_GLOBAL_REDIRECT
} from "./actionTypes";

const initialState = {
    id: "1",
    company: "Bomber Brewery",
    logo: "",
    address: "",
    contact: "",
    email: "",
    phone: "",
    redirct: ""
};

const Brewery = (state = initialState, { type, payload }) => {
    switch(type) {
        case SET_GLOBAL_REDIRECT:
            return {
                ...state,
                ...payload
            };
        default:
            return state;
    }
};

export default Brewery;