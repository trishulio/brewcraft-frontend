import React from "react";
import {
    Col,
    Row,
    TabContent,
    TabPane
} from "reactstrap";
import {
    Card,
    CardBody,
    CardHeader
} from "../../../component/Common/Card";
import Nav from "./brew-nav";
import Mash from "./brew-mash";
import Lauter from "./brew-lauter";
import Kettle from "./brew-kettle";
import Whirlpool from "./brew-whirlpool";
import Ferment from "./brew-ferment";

export default function BatchTabContent(props) {
    return (
        // <Card>
        //     <CardHeader>Brew Stage</CardHeader>
        //     <CardBody>
                <Row style={{ minHeight: "20rem" }}>
                    <Col xs={2}>
                        <Nav
                            activeTab={props.activeTab}
                            onTabChange={props.onTabChange}
                            className="mb-4"
                        />
                    </Col>
                    <Col xs={10}>
                        <TabContent activeTab={props.activeTab}>
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
                    </Col>
                </Row>
        //     </CardBody>
        // </Card>
    );
}