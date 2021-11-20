import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
    Button
} from "reactstrap";
import Toolbar from "../../../component/Common/toolbar";

export default function SkuToolbar({ editable, changed, onSave, onEdit, onDelete }) {

    const history = useHistory();

    const sku = useSelector(state => {
        return state.Sku.data;
    });

    return (
        <React.Fragment>
            <Toolbar>
                <Button
                    type="button"
                    color="secondary"
                    size="sm"
                    className="waves-effect mr-2 mb-3"
                    onClick={onSave}
                    disabled={!changed}
                    hidden={!editable}
                >
                        Save
                </Button>
                <Button
                    type="button"
                    color="secondary"
                    size="sm"
                    className="waves-effect mr-2 mb-3"
                    onClick={e => {
                        history.goBack();
                    }}
                    hidden={!editable}
                >
                    Cancel
                </Button>
                <Button
                    type="button"
                    color="secondary"
                    size="sm"
                    className="waves-effect mr-2 mb-3"
                    onClick={onEdit}
                    disabled={editable}
                    hidden={!sku.id || editable}
                >
                    Edit SKU
                </Button>
                <Button
                    type="button"
                    color="secondary"
                    size="sm"
                    className="waves-effect mr-2 mb-3"
                    hidden={!sku.id || editable}
                    onClick={() => {
                        history.push({
                            pathname: "/sku/new",
                            search: "?edit=true"
                        });
                    }}
                >
                    New SKU
                </Button>
                <Button
                    type="button"
                    color="danger"
                    size="sm"
                    className="waves-effect mr-2 mb-3"
                    onClick={onDelete}
                    hidden={!sku.id || !editable}
                >
                    Delete SKU
                </Button>
            </Toolbar>
        </React.Fragment>
    );
}