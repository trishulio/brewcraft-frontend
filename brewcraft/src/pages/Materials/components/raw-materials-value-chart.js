import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    Card,
    CardBody
} from "reactstrap";
import {
    setRawMaterialsInventoryValueActiveTab
} from "../../../store/actions";
import {
    formatCurrency,
    formatKeyAsLabel
} from "../../../helpers/textUtils";
import DountChart from "../../../component/MaterialsChart/dountchart-raw-cost";

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
                    <h4 className="card-title mb-4">Materials Value</h4>
                    <div className="row text-center mt-4">
                        <div className="col-sm-6">
                            <h5 className="mb-0 font-size-20">{formatCurrency(this.props.hops, 0)}</h5>
                            <p className="text-muted">Hops</p>
                        </div>
                        <div className="col-sm-6">
                            <h5 className="mb-0 font-size-20">{formatCurrency(this.props.malts, 0)}</h5>
                            <p className="text-muted">Malts</p>
                        </div>
                    </div>
                    <DountChart data={this.props.data} />
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
            title: formatKeyAsLabel(type),
            key: type
        });
    });
    props.data = {
        labels: Materials.RawMaterial.types.map(type => formatKeyAsLabel(type)),
        datasets: [{
            data: [],
            backgroundColor: [
                "#554D85",
                "#6D63AB",
                "#7A6FBE",
                "#948BCB",
                "#615898",
                "#7A6FBE",
                "#877DC4",
                "#A19AD1"
            ]
        }]
    };
    Materials.RawMaterial.types.forEach(type => {
        props.data.datasets[0].data.push(Materials.RawMaterial[type].value);
    });

    return props;
};

export default connect(mapStatetoProps, { setRawMaterialsInventoryValueActiveTab })(InventoryValue);