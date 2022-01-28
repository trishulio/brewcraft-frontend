import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import { Badge } from "../common/badge";

export default function BrewNav({ activeTab }) {
    const [statusId, setStatusId] = useState("");

    const mashStage = useSelector((state) => {
        return state.Batch.MashStage.initial;
    });

    const kettleStage = useSelector((state) => {
        return state.Batch.MashStage.initial;
    });

    const whirlpoolStage = useSelector((state) => {
        return state.Batch.WhirlpoolStage.initial;
    });

    useEffect(() => {
        if (
            mashStage.status.id === 2 &&
            kettleStage.status.id === 2 &&
            (!whirlpoolStage || whirlpoolStage.status.id === 2)
        ) {
            setStatusId(2); //  complete
        } else if (
            mashStage.status.id === 3 ||
            kettleStage.status.id === 3 ||
            whirlpoolStage.status.id === 3
        ) {
            setStatusId(3); // failed
        } else if (
            mashStage.status.id === 5 ||
            kettleStage.status.id === 5 ||
            whirlpoolStage.status.id === 5
        ) {
            setStatusId(5); // stopped
        } else if (
            mashStage.status.id === 1 ||
            kettleStage.status.id === 1 ||
            whirlpoolStage.status.id === 1
        ) {
            setStatusId(5); // stopped
        } else if (
            mashStage.status.id === 2 ||
            kettleStage.status.id === 2 ||
            whirlpoolStage.status.id === 2
        ) {
            setStatusId(1); // in progress
        } else {
            return 4; // init
        }
    }, [mashStage, kettleStage, whirlpoolStage]);

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
                            <Badge statusId={statusId} />
                        </NavLink>
                    </NavItem>
                </Nav>
            </div>
        </React.Fragment>
    );
}
