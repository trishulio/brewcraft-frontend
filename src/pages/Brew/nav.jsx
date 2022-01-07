import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import { useHistory } from "react-router";
import { useQuery } from "../../helpers/utils";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchFinishedGoodsByBrewId,
    fetchMaterialPortionsByBrewId,
    fetchMixtureRecordingsByBrewId,
    fetchProducts,
} from "../../store/actions";

export default function BrewNav({ activeTab }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const query = useQuery();

    const batch = useSelector((state) => {
        return state.Batch.Batch.data;
    });

    function navToTab(tab) {
        query.delete("tab");
        query.append("tab", tab);
        history.push({ search: query.toString() });
    }

    return (
        <div style={{ maxWidth: "70rem" }} className="mb-3">
            {/* <Nav pills justified> */}
            <Nav className="nav-pills nav-sm">
                <NavItem className="waves-effect waves-light">
                    <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                            active: activeTab === "details",
                        })}
                        onClick={() => {
                            setTimeout(() => {
                                dispatch(
                                    fetchProducts({
                                        pageSize: 1000,
                                    })
                                );
                            });
                            navToTab("details");
                        }}
                    >
                        <span>Overview</span>
                    </NavLink>
                </NavItem>
                <NavItem className="waves-effect waves-light">
                    <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                            active: activeTab === "brew",
                        })}
                        onClick={() => {
                            setTimeout(() => {
                                dispatch(
                                    fetchMaterialPortionsByBrewId(batch.id)
                                );
                                dispatch(
                                    fetchMixtureRecordingsByBrewId(batch.id)
                                );
                                dispatch(
                                    fetchFinishedGoodsByBrewId({
                                        brewId: batch.id,
                                        pageSize: 500,
                                    })
                                );
                            });
                            navToTab("brew");
                        }}
                    >
                        <span>Brew House</span>
                    </NavLink>
                </NavItem>
                <NavItem className="waves-effect waves-light">
                    <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                            active: activeTab === "batch",
                        })}
                        onClick={() => {
                            navToTab("batch");
                        }}
                    >
                        <span className="d-block d-sm-none">
                            <i className="fas fa-home"></i>
                        </span>
                        <span className="d-none d-sm-block">Ferment</span>
                    </NavLink>
                </NavItem>
                <NavItem className="waves-effect waves-light">
                    <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                            active: activeTab === "condition",
                        })}
                        onClick={() => {
                            navToTab("condition");
                        }}
                    >
                        <span className="d-block d-sm-none">
                            <i className="fas fa-home"></i>
                        </span>
                        <span className="d-none d-sm-block">Condition</span>
                    </NavLink>
                </NavItem>
                <NavItem className="waves-effect waves-light">
                    <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                            active: activeTab === "store",
                        })}
                        onClick={() => {
                            navToTab("store");
                        }}
                    >
                        <span className="d-block d-sm-none">
                            <i className="fas fa-home"></i>
                        </span>
                        <span className="d-none d-sm-block">Brite Tank</span>
                    </NavLink>
                </NavItem>
                <NavItem className="waves-effect waves-light">
                    <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                            active: activeTab === "summary",
                        })}
                        onClick={() => {
                            navToTab("summary");
                        }}
                    >
                        <span className="d-block d-sm-none">
                            <i className="fas fa-home"></i>
                        </span>
                        <span className="d-none d-sm-block">Report</span>
                    </NavLink>
                </NavItem>
            </Nav>
        </div>
    );
}
