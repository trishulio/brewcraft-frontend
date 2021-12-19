import React, { Fragment, useState } from "react";
import classnames from "classnames";
import { NavLink, NavItem, TabContent, Nav, TabPane } from "reactstrap";
import { map } from "lodash";

export default function Tabs({ tabitems }) {
    const [activeTab, setActiveTab] = useState(0);

    const toggle = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    return (
        <Fragment>
            <Nav tabs className="nav-tabs-custom" role="tablist">
                {map(tabitems, (value, index) => {
                    return (
                        <NavItem key={index}>
                            <NavLink
                                style={{ cursor: "pointer" }}
                                className={classnames({
                                    active: activeTab === value.id,
                                })}
                                onClick={() => {
                                    toggle(value.id);
                                }}
                            >
                                <span className="d-block d-sm-none">
                                    <i className="fas fa-home"></i>
                                </span>
                                <span className="d-none d-sm-block">
                                    {value.title}
                                </span>
                            </NavLink>
                        </NavItem>
                    );
                })}
            </Nav>

            <TabContent activeTab={activeTab}>
                {map(tabitems, (value, index) => (
                    <TabPane tabId={value.id} key={index}>
                        {value.component}
                    </TabPane>
                ))}
            </TabContent>
        </Fragment>
    );
}
