import React from "react";
import {
    Nav,
    NavItem,
    NavLink
} from "reactstrap";
import classnames from "classnames";
import { useSelector } from "react-redux";

export default function BatchNav(props) {

    const stages = useSelector(state => {
        return state.Batch.stages.content;
    });

    function onTabChange(tab) {
        props.onTabChange(tab);
    }

    let
        mashlauter = stages.find(s => s.task.id === 1),
        kettle = stages.find(s => s.task.id === 2),
        whirlpool = stages.find(s => s.task.id === 3),
        transfers = stages.find(s => s.task.id === 7);

    return (
        // <Nav pills justify className="flex-column">
        <Nav tabs style={{ borderBottom: "none" }} className="mb-3">
            {console.log(stages)}
            <NavItem className="waves-effect waves-light">
                <NavLink
                    style={{ cursor : "pointer" }}
                    className={classnames({
                        active: props.activeTab === "mashlauter"
                    })}
                    onClick={() => {
                        onTabChange("mashlauter");
                    }}
                >
                    <span className="">
                            {mashlauter?.status.id === 1 && <i style={{ color: "#7a6fbe"}} className="fa fa-check mr-1"></i>}
                    Mash Lauter</span>
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
                    <span className="">
                            {kettle?.status.id === 1 && <i style={{ color: "#7a6fbe"}} className="fa fa-check mr-1"></i>}
                    Kettle</span>
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
                    <span className="">
                            {whirlpool?.status.id === 2 && <i style={{ color: "#7a6fbe"}} className="fa fa-check mr-1"></i>}
                    Whirlpool</span>
                </NavLink>
            </NavItem>
            <NavItem className="waves-effect waves-light">
                <NavLink
                    style={{ cursor : "pointer" }}
                    className={classnames({
                        active: props.activeTab === "transfer"
                    })}
                    onClick={() => {
                        onTabChange("transfer");
                    }}
                >
                    <span>
                            {transfers?.status.id === 2 && <i style={{ color: "#7a6fbe"}} className="fa fa-check mr-1"></i>}
                    Transfer</span>
                </NavLink>
            </NavItem>
        </Nav>
    );
}