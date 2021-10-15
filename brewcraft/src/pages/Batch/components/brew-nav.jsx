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
        // <Nav pills justify className="flex-column">
        <Nav tabs style={{ borderBottom: "none" }} className="mb-3">
            <NavItem className="waves-effect waves-light">
                <NavLink
                    style={{ cursor : "pointer" }}
                    className={classnames({
                        active: props.activeTab === "mash"
                    })}
                    onClick={() => {
                        onTabChange("mash");
                    }}
                >
                    <span className="d-block d-sm-none"><i className="fa fa-chevron-right"></i></span>
                    <span className="d-none d-sm-block">Mash Tun</span>
                </NavLink>
            </NavItem>
            <NavItem className="waves-effect waves-light">
                <NavLink
                    style={{ cursor : "pointer" }}
                    className={classnames({
                        active: props.activeTab === "lauter"
                    })}
                    onClick={() => {
                        onTabChange("lauter");
                    }}
                >
                    <span className="d-block d-sm-none"><i className="fa fa-chevron-right"></i></span>
                    <span className="d-none d-sm-block">Lauter Tun</span>
                </NavLink>
            </NavItem>
            <NavItem className="nav-item waves-effect waves-light">
                <NavLink
                    style={{ cursor : "pointer" }}
                    className={classnames({
                        active: props.activeTab === "kettle"
                    })}
                    onClick={() => {
                        onTabChange("kettle");
                    }}
                >
                    <span className="d-block d-sm-none"><i className="fa fa-chevron-right"></i></span>
                    <span className="d-none d-sm-block">Wort Kettle</span>
                </NavLink>
            </NavItem>
            <NavItem className="nav-item waves-effect waves-light">
                <NavLink
                    style={{ cursor : "pointer" }}
                    className={classnames({
                        active: props.activeTab === "whirlpool"
                    })}
                    onClick={() => {
                        onTabChange("whirlpool");
                    }}
                >
                    <span className="d-block d-sm-none"><i className="fa fa-chevron-right"></i></span>
                    <span className="d-none d-sm-block">Whirlpool</span>
                </NavLink>
            </NavItem>
            <NavItem className="nav-item waves-effect waves-light">
                <NavLink
                    style={{ cursor : "pointer" }}
                    className={classnames({
                        active: props.activeTab === "ferment"
                    })}
                    onClick={() => {
                        onTabChange("ferment");
                    }}
                >
                    <span className="d-block d-sm-none"><i className="fa fa-chevron-right"></i></span>
                    <span className="d-none d-sm-block">Ferment</span>
                </NavLink>
            </NavItem>
        </Nav>
    );
}