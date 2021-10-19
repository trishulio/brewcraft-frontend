import React from "react";
import {
    TabContent,
    TabPane
} from "reactstrap";
import Nav from "./brew-nav";
import Mash from "./brew-mash";
import Kettle from "./brew-kettle";
import Whirlpool from "./brew-whirlpool";

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
            </TabContent>
        </React.Fragment>
    );
}