import React, { useState } from "react";
import { Card, CardBody, CardHeader } from "../../../../component/Common/Card";
import Nav from "./nav";
import BrewTabs from "./brew-tabs";
import { useSelector } from "react-redux";

export default function Brewhouse(props) {
    const [isOpen, setIsOpen] = useState(true);

    const { data: mashStage } = useSelector((state) => {
        return state.Batch.MashStage;
    });

    const loading = useSelector((state) => {
        return (
            state.Batch.MashStage.loading ||
            state.Batch.MashMixture.loading ||
            state.Batch.KettleStage.loading ||
            state.Batch.KettleMixture.loading ||
            state.Batch.WhirlpoolStage.loading ||
            state.Batch.WhirlpoolMixture.loading ||
            state.Batch.MashMaterialPortion.loading ||
            state.Batch.KettleMaterialPortion.loading
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
                    isLoading={mashStage.id && loading}
                    isOpen={isOpen}
                    className="px-2 pt-3 pb-0"
                >
                    {mashStage.id && (
                        <React.Fragment>
                            <div className="mb-3">
                                <Nav {...props} />
                            </div>
                            <Card className="shadow-none mb-0">
                                <CardBody className="p-0 mx-2 border">
                                    <BrewTabs {...props} />
                                </CardBody>
                            </Card>
                        </React.Fragment>
                    )}
                </CardBody>
            </Card>
        </React.Fragment>
    );
}
