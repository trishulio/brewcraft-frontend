import {
    FETCH_FACILITIES_REQUEST,
    FETCH_FACILITY_REQUEST,
    CREATE_FACILITY_REQUEST,
    UPDATE_FACILITY_REQUEST,
    DELETE_FACILITY_REQUEST,
} from "./actionTypes";

export const fetchFacilities = () => ({
    type: FETCH_FACILITIES_REQUEST,
});

export const fetchFacility = (payload) => ({
    type: FETCH_FACILITY_REQUEST,
    payload: payload,
});

export const createFacility = (payload) => ({
    type: CREATE_FACILITY_REQUEST,
    payload: payload,
});

export const updateFacility = (payload) => ({
    type: UPDATE_FACILITY_REQUEST,
    payload: payload,
});

export const deleteFacilities = (payload) => ({
    type: DELETE_FACILITY_REQUEST,
    payload: payload,
});
