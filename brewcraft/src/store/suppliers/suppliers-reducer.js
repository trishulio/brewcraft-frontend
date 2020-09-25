import { suppliersConstants } from "./suppliers-constants";

const initialState = {
    columns: [
        {
            label: 'Name',
            field: 'name',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Email',
            field: 'email',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Direct Deposit',
            field: 'directDeposit',
            sort: 'asc',
            width: 200
        },
        {
            label: 'Actions',
            field: 'actions',
            sort: 'asc',
            width: 200
        }
    ],
    rows: [],
}

export const suppliersReducer = (state = initialState, action) => {
    switch(action.type) {
        case suppliersConstants.SET_DATA:
            return {
                ...state,
                rows: action.payload,
            }
        default:
            return state;
    }
}