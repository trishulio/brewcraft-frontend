import React from "react";
import {
    Nav,
    NavItem,
    NavLink
} from "reactstrap";
import classnames from "classnames";

export default function BatchNav(props) {

    function onTabChange(tab) {
        props.onTabChange(tab);
    }

    return (
        <Nav pills>
            <NavItem className="waves-effect waves-light">
                <NavLink
                    style={{ cursor : "pointer" }}
                        className={classnames({
                            active: !props.activeTab || props.activeTab === "1"
                        })}
                        onClick={() => {
                            onTabChange("1");
                        }}
                    >
                        <span className="d-block d-sm-none"><i className="fas fa-home"></i></span>
                        <span className="d-none d-sm-block">Details</span>
                </NavLink>
            </NavItem>
            <NavItem className="waves-effect waves-light">
                <NavLink
                    style={{ cursor : "pointer" }}
                    className={classnames({
                        active: props.activeTab === "2"
                    })}
                    onClick={() => {
                        onTabChange("2");
                    }}
                >
                    <span className="d-block d-sm-none"><i className="far fa-user"></i></span>
                    <span className="d-none d-sm-block">Mash</span>
                </NavLink>
            </NavItem>
            <NavItem className="waves-effect waves-light">
                <NavLink
                    style={{ cursor : "pointer" }}
                    className={classnames({
                        active: props.activeTab === "3"
                    })}
                    onClick={() => {
                        onTabChange("3");
                    }}
                >
                    <span className="d-block d-sm-none"><i className="far fa-envelope"></i></span>
                    <span className="d-none d-sm-block">Ferment</span>
                </NavLink>
            </NavItem>
            <NavItem className="nav-item waves-effect waves-light">
                <NavLink
                    style={{ cursor : "pointer" }}
                    className={classnames({
                        active: props.activeTab === "4"
                    })}
                    onClick={() => {
                        onTabChange("4");
                    }}
                >
                    <span className="d-block d-sm-none"><i className="fas fa-cog"></i></span>
                    <span className="d-none d-sm-block">Finished Goods</span>
                </NavLink>
            </NavItem>
        </Nav>
    );
}