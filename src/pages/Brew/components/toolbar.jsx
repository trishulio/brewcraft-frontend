import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from "reactstrap";
import Select from "react-select";
import { addBatchStage, fetchBatches } from "../../../store/actions";
import { useEffect } from "react";

export default function Toolbar() {
    const [isOpenWorkflowDropdown, setIsOpenWorkflowDropdown] = useState(false);
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
                <i className="fa fa-user"></i> Assign
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect d-inline align-middle mr-2"
            >
                <i className="fa fa-print"></i> Print
            </Button>
            <Dropdown
                isOpen={isOpenWorkflowDropdown}
                toggle={() =>
                    setIsOpenWorkflowDropdown(!isOpenWorkflowDropdown)
                }
                className="d-inline-block mr-2"
            >
                <DropdownToggle
                    tag="button"
                    className="waves-effect btn btn-secondary btn-sm"
                    data-toggle="dropdown"
                >
                    <i className="fa fa-caret-down"></i> Workflow
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>
                        <span
                            className="text-dark"
                            onClick={() => {
                                dispatch(
                                    addBatchStage({
                                        taskId: 1,
                                        statusId: 4,
                                    })
                                );
                            }}
                        >
                            Add Brewhouse Turn
                        </span>
                    </DropdownItem>
                    <DropdownItem disabled={true}>
                        <span className="text-dark">Add Packaged Item</span>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    );

    return <React.Fragment>{batch.id && renderBatchToolbar()}</React.Fragment>;
}
