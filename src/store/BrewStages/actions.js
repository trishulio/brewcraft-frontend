import { SET_BATCH_STAGES } from "./actionTypes";

export const setBrewStageDetails = (payload) => ({
    type: SET_BATCH_STAGES,
    payload: {
        ...payload,
    },
});
