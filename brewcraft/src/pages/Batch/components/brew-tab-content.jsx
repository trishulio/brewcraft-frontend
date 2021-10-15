import React from "react";
import {
    TabContent,
    TabPane
} from "reactstrap";
import Nav from "./brew-nav";
import Mash from "./brew-mash";
import Lauter from "./brew-lauter";
import Kettle from "./brew-kettle";
import Whirlpool from "./brew-whirlpool";
import Ferment from "./brew-ferment";

export default function BatchTabContent(props) {
    return (
        <React.Fragment>
                <Nav
                    activeTab={props.activeTab}
                    onTabChange={props.onTabChange}
                    className="mb-4"
                />
                <TabContent activeTab={props.activeTab} className="p-2">
                    <TabPane tabId="mash">
                        <Mash {...props}/>
                    </TabPane>
                    <TabPane tabId="lauter">
                        <Lauter {...props} />
                    </TabPane>
                    <TabPane tabId="kettle">
                        <Kettle {...props}/>
                    </TabPane>
                    <TabPane tabId="whirlpool">
                        <Whirlpool {...props}/>
                    </TabPane>
                    <TabPane tabId="ferment">
                        <Ferment {...props}/>
                    </TabPane>
                </TabContent>
            </React.Fragment>
    );
}