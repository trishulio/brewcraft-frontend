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
import classnames from "classnames";
import InProcessBarChart from "../../component/MaterialsChart/barchart-in-process";

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
                    <h4 className="card-title mb-4">In-Process</h4>
                    <div className="row text-center mt-4">
                        {this.props.stats.map(stat => (
                            <div className="col-sm-12">
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
                                <InProcessBarChart data={this.props.data.hops} />
                            </TabPane>
                            <TabPane tabId="malts" className="p-3">
                                <InProcessBarChart data={this.props.data.malts} />
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
            { title: "Total Value", value: Materials.InProcess.value },
        ]
    };
    props.tabs = [];
    Materials.InProcess.types.forEach(type => {
        props.tabs.push({
            title: type.charAt(0).toUpperCase() + type.slice(1),
            key: type
        });
    });
    props.data = {};
    Materials.InProcess.types.forEach(type => {
        props.data[type] = {
            labels: Materials.InProcess[type].types,
            datasets: [{
                data: []
            }]
        };
        Materials.InProcess[type].types.forEach(subType => {
            props.data[type].datasets[0].data.push(Materials.InProcess[type][subType].cost.value);
        });
    });

    return props;
};

export default connect(mapStatetoProps, {})(InventoryValue);