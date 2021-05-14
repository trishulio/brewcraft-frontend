import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class CreateMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: false,
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            menu: !prevState.menu
        }));
    }
    render() {
        return (
            <React.Fragment>
                        <Dropdown isOpen={this.state.menu} toggle={this.toggle} className="dropdown-topbar pt-3 mt-1 d-inline-block">
                            <DropdownToggle className="btn btn-light dropdown-toggle" role="button" id="dropdownMenuLink" tag="a">
                                    Create <i className="mdi mdi-chevron-down"></i>
                            </DropdownToggle>

                            <DropdownMenu right>
                                <DropdownItem tag={Link} to="/batch/new">New Brew</DropdownItem>
                                <DropdownItem tag="a" href="#">Bottle Beer</DropdownItem>
                                <DropdownItem tag="a" href="#">Repackage</DropdownItem>
                                <DropdownItem divider></DropdownItem>
                                <DropdownItem tag="a" href="#">Report</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
            </React.Fragment>
        );
    }
}

export default CreateMenu;