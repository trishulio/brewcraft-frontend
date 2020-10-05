const initialState = {
    mtd_total: 700,
    ytd_total: 500,
    hops: {
        mtd_total: 200,
        ytd_total: 200
    },
    malts: {
        mtd_total: 500,
        ytd_total: 500
    },
    invoices: [{
        id: "IN423242",
        payments: [{
            id: "1",
            date: "01-01-2020",
            method: {
                id: 1,
                name: "Visa",
                account: "**89"
            },
            amount: 200
        }],
        vendor: {
            id: "1",
            name: "Saskatchewan Farms"
        },
        items: [{
            id: 1,
            name: "Chocolate",
            category: {
                id: "raw_material",
                name: "Hops",
                type: "hops"
            },
            desc: "",
            quantity: 100,
            price: 2,
            tax: {
                id: "1",
                name: "GST",
                rate: 0.07
            }
        }, {
            id: 2,
            name: "2-Row Malt",
            category: {
                id: "raw_material",
                name: "Malts",
                type: "malts"
            },
            desc: "",
            quantity: 100,
            price: 5,
            tax: {
                id: "1",
                name: "GST",
                rate: 0.07
            }
        }]
    }]
}

const layout = (state=initialState, action) => {
    switch(action.type) {
        default:
            break;
    }
}

export default layout;