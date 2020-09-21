import {
    SET_RAW_MATERIAL_ITEMS,
    SET_RAW_MATERIAL_DISCOVER
} from './actionTypes';

const date = new Date();

const initialState = {
    modules: {
        raw_materials: {
            overview: {
                mini_card: {
                    raw_materials: { result: "-", value: "-" },
                    in_process: { result: "-", value: "-" },
                    cogs: { result: "-", value: "-" },
                    waste: { result: "-", value: "-" }
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
                            labels: [],
                            datasets: [
                                {
                                    data: [],
                                    backgroundColor: [],
                                    hoverBackgroundColor: [],
                                    hoverBorderColor: "#fff"
                                }
                            ],
                            legend: {
                                position: 'bottom',
                                align: 'start'
                            }
                        },
                        malts: {
                            labels: [],
                            datasets: []
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
                            labels: [],
                            datasets: []
                        },
                        malts: {
                            labels: [],
                            datasets: []
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
                            labels: [],
                            datasets: []
                        },
                        malts: {
                            labels: [],
                            datasets: []
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
                    data: []
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
                    data: []
                }
            },
            discover: {
                material: {
                    value: null,
                    options: [{
                        label: "Raw Materials",
                        options: [
                            { label: "Pale 2 Row Malt", value: "pale-2-row" },
                            { label: "Carastan", value: "carastan" },
                            { label: "Munich", value: "munich" },
                            { label: "Wheat", value: "wheat" },
                            { label: "Black Malt", value: "black-malt" },
                            { label: "Chocolate Malt", value: "chocolate-malt" },
                            { label: "Crystal Malt", value: "crystal-malt" }
                        ]
                    }]
                },
                material_type: {
                    value: "",
                    options: [{
                        label: "Raw Material",
                        options: [
                            { label: "Hops", value: "hops" },
                            { label: "Malts", value: "malts" }
                        ]
                    }]
                },
                begin_date: new Date(date.getFullYear(), date.getMonth(), 1),
                end_date: date,
                mini_card: {
                    raw_materials: { result: "-", value: "-" },
                    in_process: { result: "-", value: "-" },
                    cogs: { result: "-", value: "-" },
                    waste: { result: "-", value: "-" }
                },
                inventory_value: {
                    stats: [{
                        text: "",
                        value: "-"
                    }, {
                        text: "",
                        value: "-"
                    }],
                    labels: [],
                    datasets: []
                },
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
                        rows: [],
                        columns: []
                    }
                }
            }
        }
    }
};

const layout = (state=initialState, action) => {
    switch(action.type){
        case SET_RAW_MATERIAL_ITEMS:
            return {
                ...state,
                modules: {
                    ...state.modules,
                    raw_materials: {
                        ...state.modules.raw_materials,
                        overview: {
                            ...state.modules.raw_materials.overview,
                            ...action.payload
                        }
                    }
                }
            };
        case SET_RAW_MATERIAL_DISCOVER:
            return {
                ...state,
                discover: {
                    ...state.discover,
                    ...action.payload
                }
            };

        default:
            state = {...state};
            break;
    }
    return state;
}

export default layout;
