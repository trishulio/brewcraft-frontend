import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import { Badge } from "../common/badge";

export default function BrewNav({ activeTab, setActiveTab }) {
    const [statusId, setStatusId] = useState("");

    const mashStages = useSelector((state) => {
        return state.Batch.MashStages.initial;
    });

    const kettleStage = useSelector((state) => {
        return state.Batch.MashStages.initial;
    });

    const whirlpoolStage = useSelector((state) => {
        return state.Batch.WhirlpoolStage.initial;
    });

    // useEffect(() => {
    //     if (
    //         mashStage.status.id === 2 &&
    //         kettleStage.status.id === 2 &&
    //         (!whirlpoolStage || whirlpoolStage.status.id === 2)
    //     ) {
    //         setStatusId(2); //  complete
    //     } else if (
    //         mashStage.status.id === 3 ||
    //         kettleStage.status.id === 3 ||
    //         whirlpoolStage.status.id === 3
    //     ) {
    //         setStatusId(3); // failed
    //     } else if (
    //         mashStage.status.id === 5 ||
    //         kettleStage.status.id === 5 ||
    //         whirlpoolStage.status.id === 5
    //     ) {
    //         setStatusId(5); // stopped
    //     } else if (
    //         mashStage.status.id === 1 ||
    //         kettleStage.status.id === 1 ||
    //         whirlpoolStage.status.id === 1
    //     ) {
    //         setStatusId(5); // stopped
    //     } else if (
    //         mashStage.status.id === 2 ||
    //         kettleStage.status.id === 2 ||
    //         whirlpoolStage.status.id === 2
    //     ) {
    //         setStatusId(1); // in progress
    //     } else {
    //         setStatusId(4); // init
    //     }
    // }, [mashStage, kettleStage, whirlpoolStage]);

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
                                    <Badge statusId={statusId} />
                                </NavLink>
                            </NavItem>
                        );
                    })}
                </Nav>
            </div>
        </React.Fragment>
    );
}
