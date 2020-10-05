import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Table,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";

class InProcessTable extends Component {
    render() {
        return(
            <Table className="table table-hover mb-0">
                <thead className="thead-light">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Type</th>
                        <th>Quantity</th>
                        <th>Value</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.data}
                </tbody>
            </Table>
        );
    }
}

const mapStatetoProps = (state, ownProps) => {
    const InProcess = state.Materials.InProcess;
    const props = { data: [] };
    InProcess.types.forEach(cat => {
        InProcess[cat].types.forEach(type => {
            props.data.push(
                <tr>
                    <td>{"-"}</td>
                    <td>{InProcess[cat][type].name}</td>
                    <td>{cat}</td>
                    <td>{type}</td>
                    <td>{InProcess[cat][type].quantity.value}</td>
                    <td>{InProcess[cat][type].cost.value}</td>
                    <td>
                        <Dropdown
                            direction='down'
                            isOpen={ownProps.isOpen(cat, type)}
                            toggle={() => ownProps.toggleMenu(cat, type)}
                        >
                            <DropdownToggle caret></DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem header>Header</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </td>
                </tr>
            );
        });
    });

    return props;
};

export default connect(mapStatetoProps, {})(InProcessTable);