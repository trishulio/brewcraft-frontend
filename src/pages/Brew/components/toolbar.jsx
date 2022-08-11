import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { addBatchStage, fetchBatches } from "../../../store/actions";
import { useEffect } from "react";
import StageInitModal from "./common/stage-init-modal";

export default function Toolbar({ onDelete }) {
    const [showInitStage, setShowInitStage] = useState(false);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(fetchBatches({ pageSize: 5000 }));
        // eslint-disable-next-line
    }, [id]);

    const renderBatchToolbar = () => (
        <React.Fragment>
            <div
                style={{ gap: "0.75rem 0" }}
                className="d-flex align-items-center flex-wrap"
            >
                <Button
                    type="button"
                    color="secondary"
                    className="waves-effect d-inline align-middle mr-2"
                >
                    <i className="fa fa-print"></i> Print
                </Button>
                <Button
                    type="button"
                    color="secondary"
                    className="waves-effect d-inline align-middle mr-2"
                    onClick={() => {
                        setShowInitStage(true);
                    }}
                >
                    <i className="fa fa-plus"></i> Add Turn
                </Button>
                <StageInitModal
                    show={showInitStage}
                    setShow={setShowInitStage}
                    title="Initial stage details"
                    addBatchStage={(equipmentItem) => {
                        dispatch(
                            addBatchStage({
                                parentMixtureIds: [],
                                taskId: 1,
                                statusId: 4,
                                equipment: {
                                    ...equipmentItem,
                                },
                            })
                        );
                    }}
                />
            </div>
        </React.Fragment>
    );

    return <React.Fragment>{renderBatchToolbar()}</React.Fragment>;
}
