import React, { useState } from "react";
import { useSelector } from "react-redux";
import { TabContent, TabPane } from "reactstrap";
import { Card, CardBody, CardHeader } from "../../../../component/Common/Card";
import Nav from "./nav";
import Ferment from "./ferment";

function Tabs({ fermentMixtures, activeTab }) {
    return (
        <TabContent activeTab={activeTab}>
            {fermentMixtures.map((mixture, index) => {
                return (
                    <Tab key={index} indexv={index} fermentMixture={mixture} />
                );
            })}
        </TabContent>
    );
}

function Tab({ indexv, fermentMixture }) {
    return (
        <TabPane tabId={indexv + 1}>
            <div className="accordion">
                <Ferment fermentMixture={fermentMixture} />
            </div>
        </TabPane>
    );
}

export default function Fermentation() {
    const [activeTab, setActiveTab] = useState(1);
    const [isOpen, setIsOpen] = useState(true);

    const fermentMixtures = useSelector((state) => {
        return state.Batch.BrewMixtures.content.filter(
            (m) => m.brewStage.task.id === 7
        );
    });

    return (
        <React.Fragment>
            <Card className="shadow-none mb-3">
                <CardHeader>
                    <div className="mr-2" onClick={() => setIsOpen(!isOpen)}>
                        <i
                            className={`fa fa-caret-right font-size-13 mr-2 ${
                                isOpen ? " rotate-down" : ""
                            }`}
                        ></i>
                        <span
                            className="text-dark"
                            onClick={() => setIsOpen(!isOpen)}
                            style={{ cursor: "pointer" }}
                        >
                            Fermentation Logs
                        </span>
                    </div>
                </CardHeader>
                <CardBody className="p-2 pt-3" isOpen={isOpen}>
                    {!!fermentMixtures.length && (
                        <React.Fragment>
                            <div className="mb-3">
                                <Nav
                                    activeTab={activeTab}
                                    setActiveTab={setActiveTab}
                                />
                            </div>
                            <Card className="shadow-none mb-0">
                                <CardBody className="p-0 mx-2 border">
                                    <Tabs
                                        fermentMixtures={fermentMixtures}
                                        activeTab={activeTab}
                                    />
                                </CardBody>
                            </Card>
                        </React.Fragment>
                    )}
                </CardBody>
            </Card>
        </React.Fragment>
    );
}
