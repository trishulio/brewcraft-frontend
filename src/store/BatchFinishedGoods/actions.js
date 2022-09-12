import { SET_BATCH_FINISHED_GOODS } from "./actionTypes";

export const setBatchFinishedGoods = (payload) => ({
    type: SET_BATCH_FINISHED_GOODS,
    payload: { ...payload },
});

export const showFinishedGoodModal = (show) => ({
    type: SET_BATCH_FINISHED_GOODS,
    payload: {
        showModal: show,
    },
});
