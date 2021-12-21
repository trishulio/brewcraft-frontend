import {
    FETCH_CONTACTS_REQUEST,
    FETCH_CONTACTS_SUCCESS,
    FETCH_CONTACTS_FAILURE,
    ADD_CONTACTS_REQUEST,
    ADD_CONTACTS_SUCCESS,
    ADD_CONTACTS_FAILURE,
    EDIT_CONTACTS_REQUEST,
    EDIT_CONTACTS_SUCCESS,
    DELETE_CONTACTS_REQUEST,
    DELETE_CONTACTS_SUCCESS,
} from "./actionTypes";
import { findIndex, get, filter, indexOf, values } from "lodash";
const initialState = {
    data: [
        {
            id: 0,
            Contact_owner: "Contact_owner",
            Job_title: "Job_title",
            city: "Faridabad",
            email: "test@gmail.com",
            industry: "Industry",
            last_name: "Mr.",
            mobile_phone_number: "123456789",
            origin_of_lead: "test",
            phone_number: "123456789",
            phone_number_extension: "23123",
            stat_region: "Haryana",
            street_address: "test street",
            username: "name",
        },
        {
            id: 1,
            Contact_owner: "Contact_owner",
            Job_title: "Job_title",
            city: "Faridabad",
            email: "test@gmail.com",
            industry: "Industry",
            last_name: "Mr.",
            mobile_phone_number: "123456789",
            origin_of_lead: "test",
            phone_number: "123456789",
            phone_number_extension: "23123",
            stat_region: "Haryana",
            street_address: "test street",
            username: "name",
        },
        {
            id: 2,
            Contact_owner: "Contact_owner",
            Job_title: "Job_title",
            city: "Faridabad",
            email: "test@gmail.com",
            industry: "Industry",
            last_name: "Mr.",
            mobile_phone_number: "123456789",
            origin_of_lead: "test",
            phone_number: "123456789",
            phone_number_extension: "23123",
            stat_region: "Haryana",
            street_address: "test street",
            username: "name",
        },
        {
            id: 3,
            Contact_owner: "Contact_owner",
            Job_title: "Job_title",
            city: "Faridabad",
            email: "test@gmail.com",
            industry: "Industry",
            last_name: "Mr.",
            mobile_phone_number: "123456789",
            origin_of_lead: "test",
            phone_number: "123456789",
            phone_number_extension: "23123",
            stat_region: "Haryana",
            street_address: "test street",
            username: "name",
        },
        {
            id: 4,
            Contact_owner: "Contact_owner",
            Job_title: "Job_title",
            city: "Faridabad",
            email: "test@gmail.com",
            industry: "Industry",
            last_name: "Mr.",
            mobile_phone_number: "123456789",
            origin_of_lead: "test",
            phone_number: "123456789",
            phone_number_extension: "23123",
            stat_region: "Haryana",
            street_address: "test street",
            username: "name",
        },
    ],
    loading: false,
    error: null,
    formLoading: {
        loading: false,
        error: false,
        message: "",
    },
};

const Customers = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_CONTACTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_CONTACTS_SUCCESS:
            return {
                ...state,
                data: payload,
                loading: false,
                error: null,
            };
        case FETCH_CONTACTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case ADD_CONTACTS_REQUEST:
            return {
                ...state,
                formLoading: { ...state.formLoading, loading: true },
            };
        case ADD_CONTACTS_SUCCESS:
            return {
                ...state,
                data: [...state.data, payload],
                formLoading: { ...state.formLoading, loading: false },
            };
        case ADD_CONTACTS_FAILURE:
            return {
                ...state,
                formLoading: {
                    ...state.formLoading,
                    loading: false,
                    error: true,
                    message: payload,
                },
            };
        case EDIT_CONTACTS_REQUEST:
            return {
                ...state,
                formLoading: { ...state.formLoading, loading: true },
            };
        case EDIT_CONTACTS_SUCCESS:
            let editIndex = findIndex([...state.data], function (o) {
                return o.id === get(payload, "id");
            });
            return {
                ...state,
                data: [
                    ...state.data.slice(0, editIndex),
                    payload,
                    ...state.data.slice(editIndex + 1),
                ],
                formLoading: { ...state.formLoading, loading: false },
            };
        case DELETE_CONTACTS_REQUEST:
            return {
                ...state,
                formLoading: { ...state.formLoading, loading: true },
            };
        case DELETE_CONTACTS_SUCCESS:
            var pyaloadar = values(payload);
            var filterData = filter([...state.data], (value) => {
                if (indexOf(pyaloadar, get(value, "id")) === -1) {
                    return values;
                }
            });

            return {
                ...state,
                data: filterData,
                formLoading: { ...state.formLoading, loading: false },
            };

        default:
            state = { ...state };
            break;
    }
    return state;
};

export default Customers;
