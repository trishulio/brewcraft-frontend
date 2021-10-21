import React from "react";
import {
    TabContent,
    TabPane
} from "reactstrap";
import Nav from "./nav";
import Mash from "./mash";
import Kettle from "./kettle";
import Transfer from "./transfer";
import Whirlpool from "./whirlpool";

export default function BatchTabContent(props) {
    return (
        <React.Fragment>
            <Nav
                activeTab={props.activeTab}
                onTabChange={props.onTabChange}
                className="mb-4"
            />
            <TabContent activeTab={props.activeTab} className="px-2">
                <TabPane tabId="mashlauter">
                    <Mash {...props}/>
                </TabPane>
                <TabPane tabId="kettle">
                    <Kettle {...props}/>
                </TabPane>
                <TabPane tabId="whirlpool">
                    <Whirlpool {...props}/>
                </TabPane>
                <TabPane tabId="transfer">
                    <Transfer {...props}/>
                </TabPane>
            </TabContent>
        </React.Fragment>
    );
}