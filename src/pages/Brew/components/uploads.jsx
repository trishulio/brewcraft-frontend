import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Card, CardBody, CardHeader } from "../../../component/Common/Card";

export default function BatchFileUploads() {
    const [isOpen, setIsOpen] = useState(false);

    function handleAcceptedFiles() {}

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
                            Attachments
                        </span>
                    </div>
                </CardHeader>
                <CardBody isOpen={isOpen} className="pb-0">
                    <Dropzone
                        onDrop={(acceptedFiles) =>
                            handleAcceptedFiles(acceptedFiles)
                        }
                    >
                        {({ getRootProps, getInputProps }) => (
                            <div className="dropzone">
                                <div
                                    className="dz-message needsclick"
                                    {...getRootProps()}
                                >
                                    <input {...getInputProps()} />
                                    <h3>Drop files here or click to upload.</h3>
                                </div>
                            </div>
                        )}
                    </Dropzone>
                </CardBody>
            </Card>
        </React.Fragment>
    );
}
