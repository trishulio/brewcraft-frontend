import React, { useState } from "react";
import { useSelector } from "react-redux";
import { TabContent, TabPane } from "reactstrap";
import { Card, CardBody, CardHeader } from "../../../../component/Common/Card";
import Nav from "../nav";
import Brew from "./brew";
import Transfer from "./transfer";

function Tabs({ mashMixtures, activeTab }) {
    return (
        <TabContent activeTab={activeTab}>
            <TabPane></TabPane>
            {mashMixtures.map((mixture, index) => {
                return (
                    <React.Fragment key={index}>
                        <Transfer mashMixture={mixture} />
                        <Tab indexv={index} mashMixture={mixture} />
                    </React.Fragment>
                );
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
            <div className="mb-3">
                <Nav activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
            <TabContent activeTab={activeTab}>
                <Tabs mashMixtures={mashMixtures} activeTab={activeTab} />
            </TabContent>
        </React.Fragment>
    );
}
