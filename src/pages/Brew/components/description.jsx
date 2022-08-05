import React, { useState } from "react";
import { Input } from "reactstrap";
import { Card, CardBody, CardHeader } from "../../../component/Common/Card";

export default function BatchDescription() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <React.Fragment>
            <Card className="shadow-none mb-1">
                <CardHeader>
                    <div className="mr-2" onClick={() => setIsOpen(!isOpen)}>
                        <i
                            className={`fa fa-caret-right mr-2 ${
                                isOpen ? " rotate-down" : ""
                            }`}
                        ></i>
                        <span
                            className="text-dark"
                            onClick={() => setIsOpen(!isOpen)}
                            style={{ cursor: "pointer" }}
                        >
                            Description
                        </span>
                    </div>
                </CardHeader>
                <CardBody isOpen={isOpen} className="pb-0">
                    <Input
                        type="textarea"
                        className="waves-effect px-4"
                        rows={15}
                        name="batchDescription"
                        // disabled={!editable}
                    />
                </CardBody>
            </Card>
        </React.Fragment>
    );
}
