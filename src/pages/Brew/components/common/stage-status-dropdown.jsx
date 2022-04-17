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
                        stage.status.id = 1;
                        dispatch(editBatchStage(stage));
                    }}
                >
                    <span className="text-dark">Start</span>
                </DropdownItem>
            )}
            {stage.status.id === 1 && (
                <DropdownItem
                    onClick={() => {
                        stage.status.id = 5;
                        dispatch(editBatchStage(stage));
                    }}
                >
                    <span className="text-dark">Stop</span>
                </DropdownItem>
            )}
            {stage.status.id === 1 && (
                <DropdownItem
                    onClick={() => {
                        stage.status.id = 2;
                        dispatch(editBatchStage(stage));
                    }}
                >
                    <span className="text-dark">Complete</span>
                </DropdownItem>
            )}
            {stage.status.id === 5 && (
                <DropdownItem
                    onClick={() => {
                        stage.status.id = 3;
                        dispatch(editBatchStage(stage));
                    }}
                >
                    <span className="text-dark">Failed</span>
                </DropdownItem>
            )}
        </React.Fragment>
    );
}
