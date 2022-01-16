import React, { useState } from "react";
import { Button, UncontrolledAlert } from "reactstrap";
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
} from "../../../../component/Common/Card";
import { Badge } from "../badge";

export default function BatchStage(props) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="px-2">
            <Card>
                {props.title && (
                    <CardHeader>
                        <div
                            className="d-inline-block mr-2"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <i
                                className={`fa fa-caret-right font-size-14 mr-2 ${
                                    isOpen ? " rotate-down" : ""
                                }`}
                            ></i>
                            {props.title}
                        </div>
                        <div className="d-inline-block">
                            {props.initialStage && (
                                <Badge stage={props.initialStage} />
                            )}
                        </div>
                    </CardHeader>
                )}
                <CardBody
                    isLoading={
                        props.batchLoading ||
                        props.stageLoading ||
                        props.mixtureLoading ||
                        props.materialPortionsLoading ||
                        props.mixtureRecordingsLoading ||
                        props.finishedGoodsLoading
                    }
                    isOpen={isOpen}
                >
                    <div
                        style={{
                            maxHeight: "220px",
                        }}
                        className="slider"
                    >
                        <div className="mb-4">
                            <Button
                                className="mr-2"
                                type="button"
                                color="secondary"
                                size="sm"
                                outline={true}
                                hidden={props.editable}
                                onClick={() => {
                                    props.setEditable();
                                }}
                            >
                                <i className="fa fa-edit"></i> Edit
                            </Button>
                            <Button
                                className="mr-2"
                                type="button"
                                color="secondary"
                                size="sm"
                                outline={true}
                                hidden={!props.editable}
                                onClick={() => {}}
                            >
                                <i className="fa fa-compress"></i> Combine
                            </Button>
                            <Button
                                className="mr-2"
                                type="button"
                                color="secondary"
                                size="sm"
                                outline={true}
                                hidden={!props.editable}
                                onClick={() => {}}
                            >
                                <i className="fa fa-columns"></i> Split Mixture
                            </Button>
                        </div>
                    </div>
                    {props.batchError && (
                        <UncontrolledAlert color="danger" className="mb-4">
                            {props.batchError}
                        </UncontrolledAlert>
                    )}
                    {props.stageError && (
                        <UncontrolledAlert color="danger" className="mb-4">
                            {props.stageError}
                        </UncontrolledAlert>
                    )}
                    {props.mixtureError && (
                        <UncontrolledAlert color="danger" className="mb-4">
                            {props.mixtureError}
                        </UncontrolledAlert>
                    )}
                    {props.materialPortionsError && (
                        <UncontrolledAlert color="danger" className="mb-4">
                            {props.materialPortionsError}
                        </UncontrolledAlert>
                    )}
                    {props.mixtureRecordingsError && (
                        <UncontrolledAlert color="danger" className="mb-4">
                            {props.mixtureRecordingsError}
                        </UncontrolledAlert>
                    )}
                    {props.finishedGoodsError && (
                        <UncontrolledAlert color="danger" className="mb-4">
                            {props.finishedGoodsError}
                        </UncontrolledAlert>
                    )}
                    {props.children}
                </CardBody>
                {props.editable && (
                    <CardFooter>
                        <Button
                            type="button"
                            color="primary"
                            size="sm"
                            className="waves-effect mr-2"
                            onClick={props.onSave}
                            disabled={!props.changed}
                        >
                            <i className="fa fa-save"></i> Save
                        </Button>
                        <Button
                            type="button"
                            color="secondary"
                            size="sm"
                            className="waves-effect mr-2"
                            onClick={props.onCancel}
                        >
                            <i className="fa fa-ban"></i> Done
                        </Button>
                    </CardFooter>
                )}
            </Card>
        </div>
    );
}
