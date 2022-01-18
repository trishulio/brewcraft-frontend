import React from "react";
import { TabContent, TabPane } from "reactstrap";
import Mash from "./stages/mash";
import Kettle from "./stages/kettle";
import Whirlpool from "./stages/whirlpool";
import Ferment from "./stages/ferment";
import BatchDetails from "./details";
import BatchParameters from "./params";

export default function BrewTabs(props) {
    return (
        <React.Fragment>
            <TabContent activeTab={props.activeTab}>
                <TabPane tabId="details">
                    <BatchDetails {...props} />
                </TabPane>
                <TabPane tabId="params">
                    <BatchParameters {...props} />
                </TabPane>
                <TabPane tabId="brew">
                    <Mash {...props} />
                    <Kettle {...props} />
                    <Whirlpool {...props} />
                </TabPane>
                <TabPane tabId="batch">
                    <Ferment {...props} />
                </TabPane>
            </TabContent>
        </React.Fragment>
    );
}
