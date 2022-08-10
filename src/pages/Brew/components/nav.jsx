import React from "react";
import { useSelector } from "react-redux";
import { Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import { Badge } from "./common/badge";

export default function BrewNav({ activeTab, setActiveTab }) {
    const mashStages = useSelector((state) => {
        return state.Batch.Stages.initial.filter((s) => s.task.id === 1);
    });

    const fermentStages = useSelector((state) => {
        return state.Batch.Stages.initial.filter((s) => s.task.id === 7);
    });

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
                </Nav>
            </div>
        </React.Fragment>
    );
}
