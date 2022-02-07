import React, { useState } from "react";
import { useSelector } from "react-redux";
import { TabContent, TabPane } from "reactstrap";
import { Card, CardBody, CardHeader } from "../../../../component/Common/Card";
import Nav from "./nav";
import Brew from "./brew";

function Tabs({ mashMixtures, activeTab }) {
    return (
        <TabContent activeTab={activeTab}>
            {mashMixtures.map((mixture, index) => {
                return <Tab key={index} indexv={index} mashMixture={mixture} />;
            })}
        </TabContent>
    );
}

function Tab({ indexv, mashMixture }) {
    return (
        <TabPane tabId={indexv + 1}>
            <div className="accordion">
                <Brew mashMixture={mashMixture} />
            </div>
        </TabPane>
    );
}

export default function Brewhouse() {
    const [activeTab, setActiveTab] = useState(1);
    const [isOpen, setIsOpen] = useState(true);

    const mashMixtures = useSelector((state) => {
        return state.Batch.Mixtures.content.filter(
            (m) => m.brewStage.task.id === 1
        );
    });

    const loading = useSelector((state) => {
        return (
            state.Batch.Stages.loading ||
            state.Batch.Mixtures.loading ||
            state.Batch.MaterialPortions.loading
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
                            Brewhouse Logs
                        </span>
                    </div>
                </CardHeader>
                <CardBody
                    isLoading={loading}
                    isOpen={isOpen}
                    className="px-2 pt-3 pb-0"
                >
                    {!!mashMixtures.length && (
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
                                        mashMixtures={mashMixtures}
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
