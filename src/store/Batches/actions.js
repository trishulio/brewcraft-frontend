import {
    FETCH_BATCHES_REQUEST,
    FETCH_ALL_BATCHES_REQUEST,
    SET_BATCHES_PAGE_INDEX,
    SET_BATCHES_PAGE_SIZE,
} from "./actionTypes";

export const fetchBatches = (params) => ({
    type: FETCH_BATCHES_REQUEST,
    payload: { params },
});

export const fetchAllBatches = () => ({
    type: FETCH_ALL_BATCHES_REQUEST,
});

export const setBatchesPageIndex = (index) => ({
    type: SET_BATCHES_PAGE_INDEX,
    payload: {
        pageIndex: index,
    },
});

export const setBatchesPageSize = (size) => ({
    type: SET_BATCHES_PAGE_SIZE,
    payload: {
        pageSize: size,
    },
});
