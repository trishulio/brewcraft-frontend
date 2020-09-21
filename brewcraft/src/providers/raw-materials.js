const data = {
    columns: [
        {
            label: 'Name',
            field: 'name',
            sort: 'asc',
            width: 200
        },
        {
            label: 'Type',
            field: 'type',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Supplier Name',
            field: 'supplier',
            sort: 'asc',
            width: 270
        },
        {
            label: 'Cost',
            field: 'cost',
            sort: 'asc',
            width: 100
        },
        {
            label: 'Quantity',
            field: 'quantity',
            sort: 'asc',
            width: 100
        }
    ],
    rows: [
        {
            name: "Pale 2 Row Malt",
            type: "pale 2-row",
            supplier: "Saskatchewan Farms",
            cost: "$2,100",
            quantity: "12.0 Kg"
        },
        {
            name: "Carastan Malt",
            type: "carastan",
            supplier: "Saskatchewan Farms",
            cost: "$2400",
            quantity: "47.0 Kg"
        },
        {
            name: "Munich Malt",
            type: "munich",
            supplier: "Manitoba Farms",
            cost: "$8,900",
            quantity: "710.8 Kg"
        },
        {
            name: "Wheat",
            type: "wheat",
            supplier: "Manitoba Farms",
            cost: "-",
            quantity: "0"
        },
        {
            name: "Black malt",
            type: "black-malt",
            supplier: "Saskatchewan Farms",
            cost: "-",
            quantity: "0"
        },
        {
            name: "Chocolate Malt",
            type: "chocolate-malt",
            supplier: "Manitoba Farms",
            cost: "$340",
            quantity: "250.2 Kg"
        },
        {
            name: "Crystal Malt",
            type: "crystal-malt",
            supplier: "Saskatchewan Farms",
            cost: "-",
            quantity: "0"
        },
    ]
};

const fetchOverview = () => {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            resolve({
                mini_card: {
                    raw_materials: { result: "-0.06%", value: "$1,220,320" },
                    in_process: { result: "-", value: "$0" },
                    cogs: { result: "+8.1%", value: "$459,108" },
                    waste: { result: "+7.9%", value: "$8,340" }
                },
                total_value: {
                    active_tab: "hops",
                    stats: [
                        { title: "Hops", value: "-" },
                        { title: "Malts", value: "-" }
                    ],
                    tabs: [
                        { title: "Hops", key: "hops" },
                        { title: "Malts", key: "malts" }
                    ],
                    data: {
                        hops: {
                            labels: ["Pale 2 row malt", "Carastan", "Munich", "Chocolate"],
                            datasets: [
                                {
                                    data: [21000, 20400, 20900, 25900],
                                    backgroundColor: [
                                        "#aaaaaa",
                                        "#bbbbbb",
                                        "#cccccc",
                                        "#dddddd"
                                    ],
                                    hoverBackgroundColor: [
                                        "#7a6fbe",
                                        "#7a6fbe",
                                        "#7a6fbe",
                                        "#7a6fbe"
                                        // "#ececec"
                                    ],
                                    hoverBorderColor: "#fff"
                                }
                            ],
                            legend: {
                                position: 'bottom',
                                align: 'start'
                            }
                        },
                        malts: {
                            labels: [
                                "Desktops",
                                "Tablets"
                            ],
                            datasets: [
                                {
                                    data: [300, 210],
                                    backgroundColor: [
                                        "#7a6fbe",
                                        "#ececec"
                                    ],
                                    hoverBackgroundColor: [
                                        "#7a6fbe",
                                        "#ececec"
                                    ],
                                    hoverBorderColor: "#fff"
                                }]
                        }
                    }
                },
                raw_materials: {
                    active_tab: "hops",
                    stats: [
                        { title: "Hops", value: "-" },
                        { title: "Malts", value: "-" },
                        { title: "Other", value: "-" }
                    ],
                    tabs: [
                        { title: "Hops", key: "hops" },
                        { title: "Malts", key: "malts" }
                    ],
                    data: {
                        hops: {
                            labels: ["Cascade", "Centennial", "Chinook", "Simcoe", "Citra", "Amarillo", "Mosaic", "Crystal", "Hall Mitt", "CTZ"],
                            datasets: [
                                {
                                    label: "Raw Materials Kg",
                                    backgroundColor: "#28bbe3",
                                    borderColor: "#28bbe3",
                                    borderWidth: 1,
                                    hoverBackgroundColor: "#28bbe3",
                                    hoverBorderColor: "#28bbe3",
                                    data: [120, 470, 710, 340, 560, 250, 520, 320, 350, 980]
                                }
                            ]
                        },
                        malts: {
                            labels: ["Pale 2 row malt", "Carastan", "Munich", "Wheat", "Black malt", "Chocolate", "Crystal"],
                            datasets: [
                                {
                                    label: "Raw Materials Kg",
                                    backgroundColor: "#28bbe3",
                                    borderColor: "#28bbe3",
                                    borderWidth: 1,
                                    hoverBackgroundColor: "#28bbe3",
                                    hoverBorderColor: "#28bbe3",
                                    data: [120, 470, 710, 0, 0, 250, 0]
                                }
                            ]
                        }
                    }
                },
                in_process: {
                    active_tab: "hops",
                    stats: [
                        { title: "Hops", value: "-" },
                        { title: "Malts", value: "-" }
                    ],
                    tabs: [
                        { title: "Hops", key: "hops" },
                        { title: "Malts", key: "malts" }
                    ],
                    data: {
                        hops: {
                            labels: ["Pale 2 row malt", "Carastan", "Munich", "Wheat", "Black malt", "Chocolate", "Crystal"],
                            datasets: [
                                {
                                    label: "Raw Materials Kg",
                                    backgroundColor: "#28bbe3",
                                    borderColor: "#28bbe3",
                                    borderWidth: 1,
                                    hoverBackgroundColor: "#28bbe3",
                                    hoverBorderColor: "#28bbe3",
                                    data: [120, 470, 710, 0, 0, 250, 0]
                                }
                            ]
                        },
                        malts: {
                            labels: ["Pale 2 row malt", "Carastan", "Munich", "Wheat", "Black malt", "Chocolate", "Crystal"],
                            datasets: [
                                {
                                    label: "Raw Materials Kg",
                                    backgroundColor: "#28bbe3",
                                    borderColor: "#28bbe3",
                                    borderWidth: 1,
                                    hoverBackgroundColor: "#28bbe3",
                                    hoverBorderColor: "#28bbe3",
                                    data: [120, 470, 710, 0, 0, 250, 0]
                                }
                            ]
                        }
                    }
                },
                purchases: {
                    columns: [
                        {
                            dataField: "id",
                            text: "ID"
                        }, {
                            dataField: "date",
                            text: "Date"
                        }, {
                            dataField: "type",
                            text: "Product"
                        }, {
                            dataField: "supplier",
                            text: "Supplier"
                        }, {
                            dataField: "price",
                            text: "Cost"
                        }, {
                            dataField: "qty",
                            text: "Quantity"
                        }
                    ],
                    data: [
                        { id: "042", date: new Date().toDateString(), type: "Pale 2 Row Malt", supplier: "Sask. Farms", price: "$2,400", qty: "2,000kg" },
                        { id: "041", date: new Date().toDateString(), type: "Chocolate", supplier: "Manitoba Acres", price: "$8,510", qty: "4,500kg" },
                        { id: "040", date: new Date().toDateString(), type: "Black Malt", supplier: "Manitoba Acres", price: "$10,460", qty: "10,000kg" }
                    ]
                },
                waste: {
                    columns: [
                        {
                            dataField: "id",
                            text: "ID"
                        }, {
                            dataField: "date",
                            text: "Date"
                        }, {
                            dataField: "type",
                            text: "Product"
                        }, {
                            dataField: "supplier",
                            text: "Supplier"
                        }, {
                            dataField: "lot_id",
                            text: "LOT ID"
                        }, {
                            dataField: "qty",
                            text: "Amount"
                        }
                    ],
                    data: [
                        { id: "007", date: new Date().toDateString(), type: "Pale 2 Row Malt", supplier: "Sask. Farms", lot_id: "SAK9324-G", qty: "510kg" },
                        { id: "006", date: new Date().toDateString(), type: "Chocolate", supplier: "Manitoba Acres", lot_id: "MN003245603", qty: "500kg" },
                        { id: "005", date: new Date().toDateString(), type: "Black Malt", supplier: "Manitoba Acres", lot_id: "MN003797880", qty: "30kg" }
                    ]
                }
            });
        }, 1500);
    }).catch(error => {
        console.log(error);
    });
};

const fetchDiscover = () => {
    return Promise.resolve({
        inventory_quantity: {
            stats: [{
                text: "Total Cost",
                value: "-"
            }, {
                text: "Average Cost",
                value: "-"
            }, {
                text: "Other",
                value: "-"
            }],
            labels: ["Pale 2 row malt", "Carastan", "Munich", "Wheat", "Black malt", "Chocolate", "Crystal"],
            datasets: [
                {
                    label: "Net Movement",
                    backgroundColor: "#28bbe3",
                    borderColor: "#28bbe3",
                    borderWidth: 1,
                    hoverBackgroundColor: "#28bbe3",
                    hoverBorderColor: "#28bbe3",
                    data: [120, 470, 710, -340, -700, 250, -90]
                },
                {
                    label: "Raw Materials Kg",
                    backgroundColor: "#eeeeee",
                    borderColor: "#eeeeee",
                    borderWidth: 1,
                    hoverBackgroundColor: "#28bbe3",
                    hoverBorderColor: "#28bbe3",
                    data: [120, 470, 710, 90, 180, 250, -90]
                }
            ]
        },
        records: {
            data: {
                rows: [{
                    name: "Pale 2 Row Malt",
                    type: "pale 2-row",
                    supplier: "Saskatchewan Farms",
                    cost: "$2,100",
                    quantity: "12.0 Kg"
                }],
                columns: [{
                    label: 'Name',
                    field: 'name',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'Type',
                    field: 'type',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Supplier Name',
                    field: 'supplier',
                    sort: 'asc',
                    width: 270
                },
                {
                    label: 'Cost',
                    field: 'cost',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'Quantity',
                    field: 'quantity',
                    sort: 'asc',
                    width: 100
                }]
            }
        }
    });
}

export default {
    data,
    fetchOverview,
    fetchDiscover
};