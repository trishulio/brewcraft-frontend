import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";

export default function BrewNav({activeTab, setActiveTab}) {

    return (
        <div style={{ maxWidth: "70rem" }} className="mb-3">
            {/* <Nav pills justified> */}
            <Nav className="nav-pills nav-sm">
                <NavItem className="waves-effect waves-light">
                    <NavLink
                        style={{ cursor : "pointer" }}
                        className={classnames({
                            active: activeTab === "brew",
                            "nav-item-sm": true
                        })}
                        onClick={() => {
                            setActiveTab("brew");
                        }}
                        >
                            <span>Brew</span>
                    </NavLink>
                </NavItem>
                <NavItem className="waves-effect waves-light">
                    <NavLink
                        style={{ cursor : "pointer" }}
                            className={classnames({
                                active: activeTab === "batch"
                            })}
                            onClick={() => {
                                setActiveTab("batch");
                            }}
                        >
                            <span className="d-block d-sm-none"><i className="fas fa-home"></i></span>
                            <span className="d-none d-sm-block">Batch</span>
                    </NavLink>
                </NavItem>
                <NavItem className="waves-effect waves-light">
                    <NavLink
                        style={{ cursor : "pointer" }}
                            className={classnames({
                                active: activeTab === "condition"
                            })}
                            onClick={() => {
                                setActiveTab("condition");
                            }}
                        >
                            <span className="d-block d-sm-none"><i className="fas fa-home"></i></span>
                            <span className="d-none d-sm-block">Condition</span>
                    </NavLink>
                </NavItem>
                <NavItem className="waves-effect waves-light">
                    <NavLink
                        style={{ cursor : "pointer" }}
                            className={classnames({
                                active: activeTab === "store"
                            })}
                            onClick={() => {
                                setActiveTab("store");
                            }}
                        >
                            <span className="d-block d-sm-none"><i className="fas fa-home"></i></span>
                            <span className="d-none d-sm-block">Store</span>
                    </NavLink>
                </NavItem>
                <NavItem className="waves-effect waves-light">
                    <NavLink
                        style={{ cursor : "pointer" }}
                            className={classnames({
                                active: activeTab === "summary"
                            })}
                            onClick={() => {
                                setActiveTab("summary");
                            }}
                        >
                            <span className="d-block d-sm-none"><i className="fas fa-home"></i></span>
                            <span className="d-none d-sm-block">Summary</span>
                    </NavLink>
                </NavItem>
            </Nav>
        </div>
    );
}