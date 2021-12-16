import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
    Button
} from "reactstrap";
import Toolbar from "../../../component/Common/toolbar";

export default function UserToolbar({ editable, changed, onSave, onEdit, onDelete }) {

    const history = useHistory();

    const user = useSelector(state => {
        return state.User.data;
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
                    hidden={!user.id || editable}
                >
                    Edit User
                </Button>
                <Button
                    type="button"
                    color="secondary"
                    size="sm"
                    className="waves-effect mr-2 mb-3"
                    hidden={!user.id || editable}
                    onClick={() => {
                        history.push({
                            pathname: "/users/new",
                            search: "?edit=true"
                        });
                    }}
                >
                    New User
                </Button>
                <Button
                    type="button"
                    color="danger"
                    size="sm"
                    className="waves-effect mr-2 mb-3"
                    onClick={onDelete}
                    hidden={!user.id || !editable}
                >
                    Delete User
                </Button>
            </Toolbar>
        </React.Fragment>
    );
}