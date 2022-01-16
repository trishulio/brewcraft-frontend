import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody, CardHeader } from "../../../../component/Common/Card";
import Nav from "./nav";
import Tabs from "./tabs";

export default function Brewhouse(props) {
    const [isOpen, setIsOpen] = useState(true);

    const fermentStage = useSelector((state) => {
        return state.Batch.FermentStage.data;
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
                <CardBody isOpen={isOpen} className="p-2 pt-3">
                    {fermentStage.id && (
                        <React.Fragment>
                            <div className="mb-3">
                                <Nav {...props} />
                            </div>
                            <Card className="shadow-none mb-0">
                                <CardBody className="p-0 mx-2 border">
                                    <Tabs {...props} />
                                </CardBody>
                            </Card>
                        </React.Fragment>
                    )}
                </CardBody>
            </Card>
        </React.Fragment>
    );
}
