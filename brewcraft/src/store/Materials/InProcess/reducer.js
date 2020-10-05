import {
    SET_IN_PROCESS
} from './actionTypes';

const initialState = {
    value: 860,
    types: ["hops", "malts"],
    hops: {
        cost: {
            value: 200,
        },
        quantity: {
            value: 20
        },
        types: ["chocolate"],
        chocolate: {
            name: "Chocolate",
            cost: {
                value: 200,
            },
            quantity: {
                value: 20
            },
            purchases: [{
                item_id: "1",
                invoice_id: "INVOICE-001",
                price: 2,
                quantity: 100,
                supplier: {
                    id: "1",
                    name: "Saskatchewan Farms"
                },
                brews: [{
                    id: "1",
                    name: "Frist Brew",
                    quantity: 100
                }]
            }]
        }
    },
    malts: {
        cost: 2500,
        types: ["2rowmalt"],
        "2rowmalt": {
            name: "2 Row Malt",
            cost: {
                value: 600
            },
            quantity: {
                value: 30
            },
            purchases: [{
                item_id: "2",
                invoice_id: "INVOICE-001",
                price: 5,
                quantity: 100,
                supplier: {
                    id: "1",
                    name: "Saskatchewan Farms"
                },
                brews: [{
                    id: "1",
                    name: "Frist Brew",
                    quantity: 30
                }]
            }]
        }
    }
};

const layout = (state=initialState, { type, payload }) => {
    switch(type) {
        case SET_IN_PROCESS: {
            return {
                ...state,
                in_process: {
                    ...state.in_process,
                    payload
                }
            }
        }
        default:
            return state;
    };
};

export default layout;