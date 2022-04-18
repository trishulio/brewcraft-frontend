import React from "react";
import { useDispatch } from "react-redux";
import { DropdownItem } from "reactstrap";
import { editBatchStage } from "../../../../store/actions";

export default function StatusDropdownItems({ stage, startDisabled }) {
    const dispatch = useDispatch();

    return (
        <React.Fragment>
            {[2, 3, 4, 5].includes(stage.status.id) && (
                <DropdownItem
                    disabled={startDisabled}
                    onClick={() => {
                        dispatch(
                            editBatchStage({
                                ...stage,
                                status: {
                                    id: 1,
                                    name: "IN-PROGRESS",
                                },
                            })
                        );
                    }}
                >
                    <span className="text-dark">Start</span>
                </DropdownItem>
            )}
            {stage.status.id === 1 && (
                <DropdownItem
                    onClick={() => {
                        dispatch(
                            editBatchStage({
                                ...stage,
                                status: {
                                    id: 5,
                                    name: "STOP",
                                },
                            })
                        );
                    }}
                >
                    <span className="text-dark">Stop</span>
                </DropdownItem>
            )}
            {stage.status.id === 1 && (
                <DropdownItem
                    onClick={() => {
                        dispatch(
                            editBatchStage({
                                ...stage,
                                status: {
                                    id: 2,
                                    name: "COMPLETE",
                                },
                            })
                        );
                    }}
                >
                    <span className="text-dark">Complete</span>
                </DropdownItem>
            )}
            {stage.status.id === 5 && (
                <DropdownItem
                    onClick={() => {
                        dispatch(
                            editBatchStage({
                                ...stage,
                                status: {
                                    id: 3,
                                    name: "FAILED",
                                },
                            })
                        );
                    }}
                >
                    <span className="text-dark">Failed</span>
                </DropdownItem>
            )}
        </React.Fragment>
    );
}
