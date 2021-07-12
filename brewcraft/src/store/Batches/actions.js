import {
    SET_BATCHES,
    SET_BATCHES_PAGE_INDEX,
    SET_BATCHES_PAGE_SIZE
} from "./actionTypes";

export const setBatchesDetails = (payload) => ({
    type: SET_BATCHES,
    payload: { ...payload }
});

export const setBatchesPageIndex = index => ({
    type: SET_BATCHES_PAGE_INDEX,
    payload: {
        pageIndex: index
    }
});

export const setBatchesPageSize = size => ({
    type: SET_BATCHES_PAGE_SIZE,
    payload: {
        pageSize: size
    }
});