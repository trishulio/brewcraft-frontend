import {
    SET_USED_MATERIAL
} from './actionTypes';

const initialState = {
    mtd_value: 2600,
    ytd_value: 2600,
    mtd_increase: 5,
    ytd_increase: 5,
    lifetime: 2600,
    types: ["hops", "malts"],
    hops: {
        cost: {
            mtd_total: 200,
            ytd_total: 200,
            mtd_increase: 5,
            ytd_increase: 5,
            lifetime: 200
        },
        quantity: {
            mtd_total: 80,
            mtd_increase: 5,
            ytd_increase: 5,
            mtd_total: 200,
            ytd_total: 200,
            lifetime: 200
        },
        type: ["chocolate"],
        chocolate: {
            name: "Chocolate",
            cost: {
                mtd_total: 200,
                ytd_total: 200,
                mtd_increase: 5,
                ytd_increase: 5,
                lifetime: 200
            },
            quantity: {
                mtd_total: 80,
                ytd_total: 80,
                mtd_increase: 5,
                ytd_increase: 5,
                lifetime: 80,
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
        mtd_increase: 5,
        ytd_increase: 5,
        type: ["2rowmalt"],
        "2rowmalt": {
            name: "2 Row Malt",
            cost: {
                mtd_value: 2500,
                uytd_value: 2500,
                mtd_increase: 5,
                ytd_increase: 5,
                lifetime: 2500
            },
            quantity: {
                mtd_total: 60,
                ytd_total: 60,
                mtd_increase: 5,
                ytd_increase: 5,
                lifetime: 60
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
        case SET_USED_MATERIAL: {
            return {
                ...state,
                used_material: {
                    ...state.used_material,
                    payload
                }
            }
        }
        default:
            return state;
    };
};

export default layout;