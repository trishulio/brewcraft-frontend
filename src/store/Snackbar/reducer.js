import { toast } from "react-toastify";
import {
    SNACK_WARNING,
    SNACK_SUCCESS,
    SNACK_FAILURE,
    SNACK_INFO,
} from "./actionTypes";

export default function Snackbar(state = {}, { type, payload, data }) {
    switch (type) {
        case SNACK_WARNING:
            toast.warn(payload ? payload : "Warning");
            return {
                ...state,
                warning: payload,
            };
        case SNACK_SUCCESS:
            toast.success(payload ? payload : "Success");
            return {
                ...state,
                data,
                error: null,
            };
        case SNACK_FAILURE:
            toast.error(payload ? payload : "Error");
            return {
                ...state,
                error: payload,
            };
        case SNACK_INFO:
            payload && toast.info(payload);
            return {
                ...state,
            };
        default:
            state = { ...state };
            break;
    }

    return state;
}
