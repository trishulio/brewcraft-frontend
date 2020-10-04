import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    Card,
    CardBody,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane
} from "reactstrap";
import { Bar } from 'react-chartjs-2';
import classnames from "classnames";
import {
    formatWeightKG,
    formatKeyAsLabel
} from "../../../helpers/textUtils";

class InventoryValue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active_tab: "hops",

        };
    }

    barChart(data) {
        const options = {
            legend: {
                position: "bottom"
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        var dataset = data.datasets[tooltipItem.datasetIndex];
                        var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                        var total = meta.total;
                        var currentValue = dataset.data[tooltipItem.index];
                        var percentage = parseFloat((currentValue / total * 100).toFixed(1));
                        return currentValue + ' (' + percentage + '%)';
                    },
                    title: function (tooltipItem, data) {
                        return data.labels[tooltipItem[0].index];
                    }
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        };
        return (
            <React.Fragment>
                <Bar
                    width={ window.innerWidth >= 992 ? 8 : 4 }
                    height={4}
                    data={data}
                    options={options} />
            </React.Fragment>);
    }

    render() {
        return (
            <Card>
                <CardBody>
                    <h4 className="card-title mb-4">Materials Quantity</h4>
                    <Nav tabs className="nav-tabs-custom" role="tablist">
                        {this.props.tabs.map(tab => (
                            <NavItem>
                                <NavLink
                                    style={{ cursor : "pointer" }}
                                    className={classnames({
                                        active: this.state.active_tab === tab.key
                                    })}
                                    onClick={() => {
                                        this.setState(prev => ({
                                            active_tab: tab.key
                                        }));
                                    }}
                                >
                                    <span className="d-block d-sm-none"><i className="fas fa-home"></i></span>
                                    <span className="d-none d-sm-block">{tab.title}</span>
                                </NavLink>
                            </NavItem>
                        ))}
                    </Nav>
                    <TabContent activeTab={this.state.active_tab}>
                        <TabPane tabId="hops" className="p-3">
                            <div className="row text-center mt-4">
                                {this.props.stats.map(stat => (
                                    <div className="col-sm-4">
                                        <h5 className="mb-0 font-size-20">{formatWeightKG(stat.value)}</h5>
                                        <p className="text-muted">{stat.title}</p>
                                    </div>
                                ))}
                            </div>
                            {this.barChart(this.props.data.hops)}
                        </TabPane>
                        <TabPane tabId="malts" className="p-3">
                            <div className="row text-center mt-4">
                                {this.props.stats.map(stat => (
                                    <div className="col-sm-4">
                                        <h5 className="mb-0 font-size-20">{formatWeightKG(stat.value)}</h5>
                                        <p className="text-muted">{stat.title}</p>
                                    </div>
                                ))}
                            </div>
                            {this.barChart(this.props.data.malts)}
                        </TabPane>
                    </TabContent>
                </CardBody>
            </Card>
        );
    }
}

const mapStatetoProps = state => {
    const Materials = state.Materials;
    const props = {
        stats: [
            { title: "Quantity", value: Materials.RawMaterial.value },
            { title: "MTD Average Quantity", value: Materials.RawMaterial.mtd_average_value },
            { title: "YTD Average Quantity", value: Materials.RawMaterial.ytd_average_value }
        ]
    };
    props.tabs = [];
    Materials.RawMaterial.types.forEach(type => {
        props.tabs.push({
            title: type.charAt(0).toUpperCase() + type.slice(1),
            key: type
        });
    });
    props.data = {};
    Materials.RawMaterial.types.forEach(type => {
        props.data[type] = {
            labels: Materials.RawMaterial[type].types.map(type => formatKeyAsLabel(type)),
            datasets: [{
                label: "YTD Used Material",
                backgroundColor: "#28bbe3",
                borderColor: "#28bbe3",
                borderWidth: 1,
                hoverBackgroundColor: "#28bbe3",
                hoverBorderColor: "#28bbe3",
                data: []
            }, {
                label: "YTD Wasted Material",
                backgroundColor: "#28bbe3",
                borderColor: "#28bbe3",
                borderWidth: 1,
                hoverBackgroundColor: "#28bbe3",
                hoverBorderColor: "#28bbe3",
                data: []
            }]
        };
        Materials.RawMaterial[type].types.forEach(subType => {
            props.data[type].datasets[0].data.push(Materials.Wasted[type][subType].quantity.ytd_total);
            props.data[type].datasets[1].data.push(Materials.Used[type][subType].quantity.ytd_total);
        });
    });

    // props.data = {
    //         hops: {
    //             labels: ["Cascade", "Centennial", "Chinook", "Simcoe", "Citra", "Amarillo", "Mosaic", "Crystal", "Hall Mitt", "CTZ"],
    //             datasets: [
    //                 {
    //                     label: "Raw Materials Kg",
    //                     backgroundColor: "#28bbe3",
    //                     borderColor: "#28bbe3",
    //                     borderWidth: 1,
    //                     hoverBackgroundColor: "#28bbe3",
    //                     hoverBorderColor: "#28bbe3",
    //                     data: [120, 470, 710, 340, 560, 250, 520, 320, 350, 980]
    //                 }
    //             ]
    //         },
    //         malts: {
    //             labels: ["Pale 2 row malt", "Carastan", "Munich", "Wheat", "Black malt", "Chocolate", "Crystal"],
    //             datasets: [
    //                 {
    //                     label: "Raw Materials Kg",
    //                     backgroundColor: "#28bbe3",
    //                     borderColor: "#28bbe3",
    //                     borderWidth: 1,
    //                     hoverBackgroundColor: "#28bbe3",
    //                     hoverBorderColor: "#28bbe3",
    //                     data: [120, 470, 710, 0, 0, 250, 0]
    //                 }
    //             ]
    //         }
    //     };
    return  props;
};

export default connect(mapStatetoProps, {})(InventoryValue);