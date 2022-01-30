import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";
import { Button } from "reactstrap";

export default function BrewMonitorToolbar() {
    const history = useHistory();
    const { id } = useParams();

    const batches = useSelector((state) => {
        return state.Batches.content;
    });

    const { data: batch } = useSelector((state) => {
        return state.Batch.Batch;
    });

    return (
        <div className="mb-3">
            <Select
                className="d-inline-block align-middle mr-3"
                isMulti={false}
                name="brewMonitorId"
                value={{
                    id,
                    label: batch.batchId,
                }}
                placeholder="Select Batch .."
                options={batches.map((b) => ({
                    value: b.id,
                    label: `${b.batchId} ${b.product.name}`,
                }))}
                onChange={(e) => {
                    history.push({
                        pathname: "/brews/monitor/" + e.value,
                    });
                }}
                styles={{
                    control: (styles) => ({
                        ...styles,
                        width: "12rem",
                        // maxWidth: "25%",
                        // flex: "0 0  25%",
                        "@media screen and (max-width: 750px)": {
                            width: "100%",
                        },
                    }),
                }}
            />
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect d-inline align-middle mr-2"
                onClick={() => {
                    history.push({
                        pathname: "/brews/" + id,
                        search: "?edit=true",
                    });
                }}
            >
                <i className="fa fa-edit"></i> Edit Batch
            </Button>
        </div>
    );
}
