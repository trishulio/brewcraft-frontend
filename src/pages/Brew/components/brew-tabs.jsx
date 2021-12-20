import React from "react";
import { Card, CardHeader, CardBody, TabContent, TabPane } from "reactstrap";
import Mash from "./stages/mash";
import Kettle from "./stages/kettle";
import Whirlpool from "./stages/whirlpool";
import Ferment from "./stages/ferment";
import BatchDetails from "./details";

export default function BrewTabs(props) {
    return (
        <React.Fragment>
            <TabContent activeTab={props.activeTab}>
                <TabPane tabId="details">
                    <BatchDetails {...props} />
                </TabPane>
                <TabPane tabId="brew">
                    <Card className="mb-3">
                        <CardHeader>
                            <div className="float-left">
                                <h4 className="card-title font-size-14 pt-1">
                                    Mash Lauter
                                </h4>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <Mash {...props} />
                        </CardBody>
                    </Card>
                    <Card className="mb-3">
                        <CardHeader>
                            <div className="float-left">
                                <h4 className="card-title font-size-14 pt-1">
                                    Boil
                                </h4>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <Kettle {...props} />
                        </CardBody>
                    </Card>
                    <Card className="mb-3">
                        <CardHeader>
                            <div className="float-left">
                                <h4 className="card-title font-size-14 pt-1">
                                    Whirlpool
                                </h4>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <Whirlpool {...props} />
                        </CardBody>
                    </Card>
                </TabPane>
                <TabPane tabId="batch">
                    <Card className="mb-3">
                        <CardHeader>
                            <div className="float-left">
                                <h4 className="card-title font-size-14 pt-1">
                                    Ferment
                                </h4>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <Ferment {...props} />
                        </CardBody>
                    </Card>
                </TabPane>
            </TabContent>
        </React.Fragment>
    );
}
