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
import DountChart from "../../component/MaterialsChart/dountchart-raw-cost";

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
                    <h4 className="card-title mb-4">Inventory Value</h4>
                    <div className="row text-center mt-4">
                        <div className="col-sm-6">
                            <h5 className="mb-0 font-size-20">{this.props.hops}</h5>
                            <p className="text-muted">Hops</p>
                        </div>
                        <div className="col-sm-6">
                            <h5 className="mb-0 font-size-20">{this.props.malts}</h5>
                            <p className="text-muted">Malts</p>
                        </div>
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
                            <DountChart data={this.props.data.hops} />
                        </TabPane>
                        <TabPane tabId="malts" className="p-3">
                            <DountChart data={this.props.data.malts} />
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
        hops: Materials.RawMaterial.hops.value,
        malts: Materials.RawMaterial.malts.value
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
};

export default connect(mapStatetoProps, { setRawMaterialsInventoryValueActiveTab })(InventoryValue);