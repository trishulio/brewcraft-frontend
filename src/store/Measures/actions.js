import {
    FETCH_MEASURE_REQUEST,
    SET_MEASURE_PAGE_INDEX,
    SET_MEASURE_PAGE_SIZE,
} from "./actionTypes";

export const fetchMeasures = (params) => ({
    type: FETCH_MEASURE_REQUEST,
    payload: { params },
});

export const setMeasuresPageIndex = (index) => ({
    type: SET_MEASURE_PAGE_INDEX,
    payload: {
        pageIndex: index,
    },
});

export const setMeasuresPageSize = (size) => ({
    type: SET_MEASURE_PAGE_SIZE,
    payload: {
        pageSize: size,
    },
});
