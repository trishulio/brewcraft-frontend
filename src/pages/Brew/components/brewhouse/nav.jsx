import React from "react";
import { useSelector } from "react-redux";
import { Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import { Badge } from "../common/badge";

export default function BrewNav({ activeTab, setActiveTab }) {
    const mashStages = useSelector((state) => {
        return state.Batch.Stages.initial.filter((s) => s.task.id === 1);
    });

    return (
        <React.Fragment>
            <div style={{ maxWidth: "70rem" }} className="mb-0">
                <Nav className="nav-tabs nav-sm">
                    {mashStages.map((_, index) => {
                        return (
                            <NavItem
                                key={index}
                                className="waves-effect waves-light"
                            >
                                <NavLink
                                    style={{ cursor: "pointer" }}
                                    className={classnames({
                                        active: activeTab === index + 1,
                                    })}
                                    onClick={() => {
                                        setActiveTab(index + 1);
                                    }}
                                >
                                    <span>Brewhouse Turn {index + 1}</span>{" "}
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
