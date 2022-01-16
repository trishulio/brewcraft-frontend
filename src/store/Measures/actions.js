import {
    FETCH_MEASURES_REQUEST,
    FETCH_MEASURES_SUCCESS,
    SET_MEASURE_PAGE_INDEX,
    SET_MEASURE_PAGE_SIZE,
} from "./actionTypes";

export const fetchMeasures = (params) => ({
    type: FETCH_MEASURES_REQUEST,
    payload: {
        success: params?.success,
    },
});

export const setMeasures = (measures) => ({
    type: FETCH_MEASURES_SUCCESS,
    payload: measures,
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
