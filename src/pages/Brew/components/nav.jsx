import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";

export default function BrewNav({ activeTab, setActiveTab }) {
    function navToTab(tab) {
        setActiveTab(tab);
    }

    return (
        <React.Fragment>
            <div style={{ maxWidth: "70rem" }} className="mb-0">
                <Nav className="nav-pills">
                    <NavItem
                        key={"details"}
                        className="waves-effect waves-light"
                    >
                        <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                                active: activeTab === "details",
                            })}
                            onClick={() => {
                                navToTab("details");
                            }}
                        >
                            <span>Details</span>
                        </NavLink>
                    </NavItem>
                    <NavItem key="stages" className="waves-effect waves-light">
                        <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                                active: activeTab === "stages",
                            })}
                            onClick={() => {
                                navToTab("stages");
                            }}
                        >
                            <span>Stages</span>
                        </NavLink>
                    </NavItem>
                    <NavItem
                        key="materials"
                        className="waves-effect waves-light"
                    >
                        <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                                active: activeTab === "materials",
                            })}
                            onClick={() => {
                                navToTab("materials");
                            }}
                        >
                            <span>Materials</span>
                        </NavLink>
                    </NavItem>
                    <NavItem
                        key="finished-goods"
                        className="waves-effect waves-light"
                    >
                        <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                                active: activeTab === "finished-goods",
                            })}
                            onClick={() => {
                                navToTab("finished-goods");
                            }}
                        >
                            <span>Finished Goods</span>
                        </NavLink>
                    </NavItem>
                </Nav>
            </div>
        </React.Fragment>
    );
}
