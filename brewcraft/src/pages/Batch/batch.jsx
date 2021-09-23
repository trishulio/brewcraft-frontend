import React from "react";
import {
  Row,
  Col,
  TabContent,
  TabPane
} from "reactstrap";
import Nav from "./components/nav";
import Metadata from "./components/metadata";
import BrewDetails from "./components/brew-details";
import Details from "./components/details";

export default function Batch(props) {

    return (
        <React.Fragment>

            <Nav
                activeTab={props.activeTab}
                onTabChange={props.onTabChange}
                className="mb-4"
            />

            <TabContent activeTab={props.activeTab}>
                <TabPane tabId="1" className="p-3">
                    <Metadata {...props} />
                </TabPane>
                <TabPane tabId="2" className="p-3">
                    <BrewDetails {...props} />
                </TabPane>
                <TabPane tabId="3" className="p-3">
                    <Details {...props}/>
                </TabPane>
                <TabPane tabId="4" className="p-3">
                    <p className="mb-0">
                        Trust fund seitan letterpress, keytar raw denim keffiyeh etsy art party before they sold out master cleanse gluten-free squid scenester freegan cosby sweater. Fanny pack portland seitan DIY, art party locavore wolf cliche high life echo park Austin. Cred vinyl keffiyeh DIY salvia PBR, banh mi before they sold out farm-to-table VHS viral locavore cosby sweater. Lomo wolf viral, mustache readymade thundercats keffiyeh craft beer marfa ethical. Wolf salvia freegan, sartorial keffiyeh echo park vegan.
                    </p>
                </TabPane>
            </TabContent>
        </React.Fragment>
    );
}