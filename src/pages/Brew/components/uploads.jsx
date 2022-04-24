import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Card, CardBody } from "../../../component/Common/Card";
import TooltipButton from "../../../component/Common/tooltip-button";
import { StageHeader } from "./common/stage";

export default function BatchFileUploads() {
    const [isOpen, setIsOpen] = useState(false);

    function handleAcceptedFiles() {}

    return (
        <React.Fragment>
            <Card className="shadow-none mb-1">
                <StageHeader
                    title="Attachments"
                    toggleIsOpen={() => {
                        setIsOpen(!isOpen);
                    }}
                    toolbar={
                        <React.Fragment>
                            <TooltipButton
                                id="toggleAttachmentsButton"
                                className="waves-effect m-0 mr-1 mb-1"
                                size="sm"
                                outline={true}
                                tooltipText={isOpen ? "Show Less" : "Show More"}
                                placement="bottom"
                                onClick={() => {
                                    setIsOpen(!isOpen);
                                }}
                            >
                                <i className="mdi mdi-arrow-up-down"></i>
                            </TooltipButton>
                        </React.Fragment>
                    }
                />
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
