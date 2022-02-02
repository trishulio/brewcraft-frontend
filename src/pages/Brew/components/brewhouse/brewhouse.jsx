import React, { useState } from "react";
import { Card, CardBody, CardHeader } from "../../../../component/Common/Card";
import Nav from "./nav";
import Tab from "./tab";
import { useSelector } from "react-redux";
import { TabContent } from "reactstrap";

export default function Brewhouse(props) {
    const [activeTab, setActiveTab] = useState(1);
    const [isOpen, setIsOpen] = useState(true);

    const mashMixtures = useSelector((state) => {
        return state.Batch.Mixtures.content.filter(
            (m) => m.brewStage.task.id === 1
        );
    });

    const loading = useSelector((state) => {
        return (
            // state.Batch.MashStages.loading ||
            // state.Batch.MashMixture.loading ||
            // state.Batch.KettleStage.loading ||
            // state.Batch.KettleMixture.loading ||
            // state.Batch.WhirlpoolStage.loading ||
            // state.Batch.WhirlpoolMixture.loading ||
            // state.Batch.MashMaterialPortion.loading ||
            // state.Batch.KettleMaterialPortion.loading
            false
        );
    });

    const navProps = {
        activeTab,
        setActiveTab,
    };

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
                    isLoading={mashMixtures.length && loading}
                    isOpen={isOpen}
                    className="px-2 pt-3 pb-0"
                >
                    {mashMixtures.length && (
                        <React.Fragment>
                            <div className="mb-3">
                                <Nav {...navProps} />
                            </div>
                            <Card className="shadow-none mb-0">
                                <CardBody className="p-0 mx-2 border">
                                    <TabContent activeTab={activeTab}>
                                        {mashMixtures.map((mixture, index) => {
                                            return (
                                                <Tab
                                                    key={index}
                                                    indexv={index}
                                                    mashMixture={mixture}
                                                    {...navProps}
                                                    {...props}
                                                />
                                            );
                                        })}
                                    </TabContent>
                                </CardBody>
                            </Card>
                        </React.Fragment>
                    )}
                </CardBody>
            </Card>
        </React.Fragment>
    );
}
