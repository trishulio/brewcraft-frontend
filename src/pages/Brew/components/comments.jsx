import React, { useState } from "react";
import { Card, CardBody, CardHeader } from "../../../component/Common/Card";

export default function BatchComments() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <React.Fragment>
            <Card className="shadow-none mb-1">
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
                            Comments
                        </span>
                    </div>
                </CardHeader>
                <CardBody isOpen={isOpen}></CardBody>
            </Card>
        </React.Fragment>
    );
}
