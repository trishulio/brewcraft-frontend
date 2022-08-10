import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import Select from "react-select";
import { addBatchStage, fetchBatches } from "../../../store/actions";
import { useEffect } from "react";
import StageInitModal from "./common/stage-init-modal";

export default function Toolbar({ onDelete }) {
    const [showInitStage, setShowInitStage] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    const batch = useSelector((state) => {
        return state.Batch.Batch.data;
    });

    const batches = useSelector((state) => {
        return state.Batches.content;
    });

    useEffect(() => {
        dispatch(fetchBatches({ pageSize: 5000 }));
        // eslint-disable-next-line
    }, [id]);

    const renderBatchToolbar = () => (
        <React.Fragment>
            <Select
                className="d-inline-block align-middle mr-3"
                isMulti={false}
                name="brewMonitorId"
                value={
                    batch.id && {
                        id,
                        label: `Brew ${batch.id} - ${batch.product.name}`,
                    }
                }
                placeholder="Select Batch .."
                options={batches.map((b) => ({
                    value: b.id,
                    label: `Brew ${b.id} - ${b.product.name}`,
                }))}
                onChange={(e) => {
                    history.push({
                        pathname: "/brews/" + e.value,
                        search: "?edit=true",
                    });
                }}
                styles={{
                    control: (styles) => ({
                        ...styles,
                        width: "12rem",
                        "@media screen and (max-width: 750px)": {
                            width: "100%",
                        },
                    }),
                }}
                enabled={batch.id}
            />
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
            <Button
                type="button"
                color="danger"
                className="waves-effect d-inline align-middle mr-2"
                onClick={onDelete}
            >
                <i className="fa fa-minus-circle"></i> Delete Brew
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
        </React.Fragment>
    );

    return <React.Fragment>{renderBatchToolbar()}</React.Fragment>;
}
