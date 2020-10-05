import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    setRawMaterialsInventoryValueActiveTab
} from "../../store/actions";
import {
    Card,
    CardBody,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane
} from "reactstrap";
import classnames from "classnames";
import BarChart from "../../component/MaterialsChart/barchart-raw-quantity";

class InventoryValue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active_tab: "hops"
        };
    }

    render() {
        return (
            <Card>
                <CardBody>
                    <h4 className="card-title mb-4">Materials Quantity</h4>
                    <div className="row text-center mt-4">
                        {this.props.stats.map(stat => (
                            <div className="col-sm-4">
                                <h5 className="mb-0 font-size-20">{stat.value}</h5>
                                <p className="text-muted">{stat.title}</p>
                            </div>
                        ))}
                    </div>
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
                            <BarChart data={this.props.data.hops}/>
                        </TabPane>
                        <TabPane tabId="malts" className="p-3">
                            <BarChart data={this.props.data.malts}/>
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
            labels: Materials.RawMaterial[type].types,
            datasets: [{
                data: []
            }]
        };
        Materials.RawMaterial[type].types.forEach(subType => {
            props.data[type].datasets[0].data.push(Materials.RawMaterial[type][subType].cost.value);
        });
    });

    return props;

    //     data: {
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
    //     }
    // };
};

export default connect(mapStatetoProps, {})(InventoryValue);