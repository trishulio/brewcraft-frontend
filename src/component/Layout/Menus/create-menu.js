import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";

class CreateMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: false,
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState((prevState) => ({
            menu: !prevState.menu,
        }));
    }
    render() {
        return (
            <React.Fragment>
                <Dropdown
                    isOpen={this.state.menu}
                    toggle={this.toggle}
                    className="dropdown-topbar pt-3 mt-1 d-inline-block"
                >
                    <DropdownToggle
                        className="btn btn-light dropdown-toggle"
                        role="button"
                        id="dropdownMenuLink"
                        tag="a"
                    >
                        New <i className="mdi mdi-chevron-down"></i>
                    </DropdownToggle>

                    <DropdownMenu right>
                        <DropdownItem tag={Link} to="/brews/new">
                            Brew
                        </DropdownItem>
                        <DropdownItem
                            tag={Link}
                            to="/materials/ingredients/new"
                        >
                            Ingredient
                        </DropdownItem>
                        <DropdownItem tag={Link} to="/purchases/invoices/new">
                            Purchase Invoice
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </React.Fragment>
        );
    }
}

export default CreateMenu;
