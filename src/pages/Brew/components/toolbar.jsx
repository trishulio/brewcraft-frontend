import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import Select from "react-select";
import { addBatchStage, fetchBatches } from "../../../store/actions";
import { useEffect } from "react";

export default function Toolbar() {
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
                value={{
                    id,
                    label: `Brew ${batch.id} - ${batch.product.name}`,
                }}
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
            />
            {/* <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect d-inline align-middle mr-2"
            >
                <i className="fa fa-comment"></i> Comment
            </Button> */}
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect d-inline align-middle mr-2"
            >
                <i className="fa fa-print"></i> Print
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect d-inline align-middle mr-2"
                onClick={() => {
                    dispatch(
                        addBatchStage({
                            taskId: 1,
                            statusId: 4,
                        })
                    );
                }}
            >
                <i className="fa fa-plus"></i> Add Turn
            </Button>
        </React.Fragment>
    );

    return <React.Fragment>{batch.id && renderBatchToolbar()}</React.Fragment>;
}
