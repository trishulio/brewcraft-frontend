import {
    SET_RAW_MATERIAL_ITEMS,
    SET_RAW_MATERIAL_DISCOVER
} from './actionTypes';

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
            discover: {}
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
