import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  TabContent,
  TabPane,
  Alert,
  Row,
  Col
} from "reactstrap";
import BatchDetails from "./components/details";
import Nav from "./nav";
import MiniCard from "./components/mini-card";
import Mash from "./components/stages/mash";
import Kettle from "./components/stages/kettle";
import Whirlpool from "./components/stages/whirlpool";
import Toolbar from "./components/toolbar";
import Ferment from "./components/stages/ferment";
import { useSelector } from "react-redux";

export default function Batch(props) {
    const [activeTab, setActiveTab] = useState("brew");

    const { data: batch, error } = useSelector(state => {
        return state.Batch.Batch;
    });

    return (
        <React.Fragment>
            {console.log(error)}
            <div style={{ maxWidth: "70rem" }}>
                {error &&
                    <Alert color="info" className="mt-2 mb-4">
                        <strong>Oh snap!</strong> Change a few things up and try submitting again.
                    </Alert>
                }
                <div className="mb-3 px-2">
                    {batch.id && <MiniCard/>}
                    <div className="mb-3">
                        <Toolbar {...props}/>
                    </div>
                    <BatchDetails {...props}/>
                </div>
                {batch.id &&
                    <React.Fragment>
                        <Nav {...{activeTab, setActiveTab}}/>
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId="brew">
                                <Row className="text-center mt-4 pt-2">
                                    <Col xs="3">
                                        <h5 className="font-size-20">40.40 hl</h5>
                                        <p className="text-muted">Final Volume (Wort)</p>
                                    </Col>
                                    <Col xs="3">
                                        <h5 className="font-size-20">1.018</h5>
                                        <p className="text-muted">Original Gravity (Actual)</p>
                                    </Col>
                                    <Col xs="3">
                                        <h5 className="font-size-20">100.0</h5>
                                        <p className="text-muted">Yield</p>
                                    </Col>
                                    {/* <Col xs="3">
                                        <h5 className="font-size-20">$285.10</h5>
                                        <p className="text-muted">Cost</p>
                                    </Col> */}
                                </Row>
                                <Card className="mb-3">
                                    <CardHeader>
                                        <div className="float-left">
                                            <h4 className="card-title font-size-14 pt-1">Mash Lauter</h4>
                                        </div>
                                    </CardHeader>
                                    <CardBody>
                                        <Mash {...props}/>
                                    </CardBody>
                                </Card>
                                <Card className="mb-3">
                                    <CardHeader>
                                        <div className="float-left">
                                            <h4 className="card-title font-size-14 pt-1">Boil</h4>
                                        </div>
                                    </CardHeader>
                                    <CardBody>
                                        <Kettle {...props}/>
                                    </CardBody>
                                </Card>
                                <Card className="mb-3">
                                    <CardHeader>
                                        <div className="float-left">
                                            <h4 className="card-title font-size-14 pt-1">Whirlpool</h4>
                                        </div>
                                    </CardHeader>
                                    <CardBody>
                                        <Whirlpool {...props}/>
                                    </CardBody>
                                </Card>
                            </TabPane>
                            <TabPane tabId="batch">
                                <Card className="mb-3">
                                    <CardHeader>
                                        <div className="float-left">
                                            <h4 className="card-title font-size-14 pt-1">Ferment</h4>
                                        </div>
                                    </CardHeader>
                                    <CardBody>
                                        <Ferment {...props}/>
                                    </CardBody>
                                </Card>
                            </TabPane>
                        </TabContent>
                    </React.Fragment>
                }
            </div>
        </React.Fragment>
    );
}