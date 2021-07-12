import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    Button,
    Input
} from "reactstrap";
import Toolbar from "../../../component/Common/toolbar";

export default function BatchesToolbar() {

    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <Toolbar>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                onClick={() => {
                    history.push("/batches/new");
                }}
            >
                    New Batch
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                onClick={() => {
                    history.push("/finished-goods");
                }}
            >
                    Finished Goods
            </Button>
            <Input
                type="select"
                size="sm"
                className="waves-effect float-right mb-3 ml-2"
                style={{ width: 100 }}
            >
                <option value="">All</option>
                <option value="">Active</option>
                <option value="">Done</option>
                <option value="">Failed</option>
            </Input>
            <Input
                size="sm"
                type="search"
                name="search"
                id="batchesSearch"
                placeholder="Name"
                className="waves-effect float-right mb-3 ml-2"
                style={{ width: 170 }}
            />
        </Toolbar>
    );
}