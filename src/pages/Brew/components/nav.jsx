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
                <Nav className="nav-tabs nav-sm">
                    <NavItem
                        key={"overview"}
                        className="waves-effect waves-light"
                    >
                        <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                                active: activeTab === "overview",
                            })}
                            onClick={() => {
                                navToTab("overview");
                            }}
                        >
                            <span>Overview</span>
                        </NavLink>
                    </NavItem>
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
                    {mashStages.map((_, index) => {
                        return (
                            <NavItem
                                key={"brew-" + index}
                                className="waves-effect waves-light"
                            >
                                <NavLink
                                    style={{ cursor: "pointer" }}
                                    className={classnames({
                                        active:
                                            activeTab === "brew-" + (index + 1),
                                    })}
                                    onClick={() => {
                                        navToTab("brew-" + (index + 1));
                                    }}
                                >
                                    <span>Turn {index + 1}</span>{" "}
                                    <Badge statusId={""} />
                                </NavLink>
                            </NavItem>
                        );
                    })}
                    {fermentStages.map((_, index) => {
                        return (
                            <NavItem
                                key={"brew-" + index + mashStages.length}
                                className="waves-effect waves-light"
                            >
                                <NavLink
                                    style={{ cursor: "pointer" }}
                                    className={classnames({
                                        active:
                                            activeTab ===
                                            "brew-" +
                                                (index + mashStages.length + 1),
                                    })}
                                    onClick={() => {
                                        navToTab(
                                            "brew-" +
                                                (index + mashStages.length + 1)
                                        );
                                    }}
                                >
                                    <span>Cellar {index + 1}</span>{" "}
                                    <Badge statusId={""} />
                                </NavLink>
                            </NavItem>
                        );
                    })}
                </Nav>
            </div>
        </React.Fragment>
    );
}
