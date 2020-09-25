import {
    SET_WASTED_MATERIAL
} from './actionTypes';

const initialState = {
    mtd_value: 130,
    ytd_value: 130,
    mtd_increase: 5,
    ytd_increase: 5,
    lifetime: 130,
    types: ["hops", "malts"],
    hops: {
        cost: {
            mtd_total: 10,
            ytd_total: 10,
            mtd_increase: 5,
            ytd_increase: 5,
            lifetime: 10
        },
        quantity: {
            mtd_total: 10,
            ytd_total: 10,
            mtd_increase: 5,
            ytd_increase: 5,
            lifetime: 10
        },
        type: ["chocolate"],
        chocolate: {
            name: "Chocolate",
            cost: {
                mtd_total: 10,
                ytd_total: 10,
                mtd_increase: 5,
                ytd_increase: 5,
                lifetime: 10
            },
            quantity: {
                mtd_total: 10,
                ytd_total: 10,
                mtd_increase: 5,
                ytd_increase: 5,
                lifetime: 10,
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
                    quantity: 10
                }]
            }]
        }
    },
    malts: {
        value: 125,
        mtd_increase: 5,
        ytd_increase: 5,
        type: ["2rowmalt"],
        "2rowmalt": {
            name: "2 Row Malt",
            cost: {
                mtd_value: 125,
                uytd_value: 125,
                mtd_increase: 5,
                ytd_increase: 5,
                lifetime: 125
            },
            quantity: {
                mtd_total: 15,
                ytd_total: 15,
                mtd_increase: 5,
                ytd_increase: 5,
                lifetime: 15
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
        case SET_WASTED_MATERIAL:
            return {
                ...state,
                wasted_material: {
                    ...state.wasted_material,
                    payload
                }
            }
        default:
            return state;
    };
};

export default layout;