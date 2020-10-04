import {
    SET_RAW_MATERIAL
} from './actionTypes';

const initialState = {
    value: 4700,
    value_increase: 10,
    mtd_average_value: 2700,
    mtd_average_value_increase: 0,
    ytd_average_value: 2700,
    ytd_average_value_increase: 0,
    types: ["hops", "malts"],
    hops: {
        value: 2000,
        mtd_average_value: 200,
        mtd_average_value_increase: 0,
        ytd_average_value: 200,
        ytd_average_value_increase: 0,
        types: ["chocolate"],
        chocolate: {
            name: "Chocolate",
            cost: {
                value: 200,
            },
            quantity: {
                value: 200
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
                    quantity: 80
                }]
            }]
        }
    },
    malts: {
        value: 2500,
        mtd_average_value: 2500,
        mtd_average_value_increase: 0,
        ytd_average_value: 2500,
        ytd_average_value_increase: 0,
        types: ["2rowmalt"],
        "2rowmalt": {
            name: "2 Row Malt",
            cost: {
                value: 2500,
                mtd_increase: 5,
                ytd_increase: 5
            },
            quantity: {
                value: 49800,
                mtd_increase: 5,
                ytd_increase: 5
            },
            purchases: [{
                item_id: "2",
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
                    quantity: 40
                }]
            }]
        }
    }
};

const layout = (state=initialState, { type, payload }) => {
    switch(type) {
        case SET_RAW_MATERIAL: {
            return {
                ...state,
                raw_material: {
                    ...state.raw_material,
                    payload
                }
            }
        }
        default:
            return state;
    };
};

export default layout;