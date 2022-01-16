import React from "react";
import { useSelector } from "react-redux";
import { Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import { Badge } from "../common/badge";

export default function BrewNav({ activeTab }) {
    const stage = useSelector((state) => {
        const stages = [
            state.Batch.MashStage.data,
            state.Batch.KettleStage.data,
            state.Batch.WhirlpoolStage.data,
            state.Batch.TransferStage.data,
        ];
        let stage;
        stage = stages.find((s) => s.status.id !== 2 && s.status.id !== 6);
        if (!stage) {
            stage = stages.reverse().find((s) => s.status.id === 2);
        }
        return stage;
    });

    function navToTab(tab) {}

    return (
        <React.Fragment>
            <div style={{ maxWidth: "70rem" }} className="mb-0">
                {/* <Nav pills justified> */}
                <Nav className="nav-tabs nav-sm">
                    <NavItem className="waves-effect waves-light">
                        <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                                active: activeTab === "1",
                            })}
                            onClick={() => {
                                navToTab("1");
                            }}
                        >
                            <span>Brewhouse Turn 1</span>{" "}
                            <Badge stageId={stage.status.id} />
                        </NavLink>
                    </NavItem>
                </Nav>
            </div>
        </React.Fragment>
    );
}
