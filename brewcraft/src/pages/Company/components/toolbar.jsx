import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
    Button
} from "reactstrap";

export default function Toolbar({ editable, changed, onSave, onDelete }) {
    const history = useHistory();

    const company = useSelector(state => {
        return state.Company.data;
    });

    return (
        <React.Fragment>
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
                onClick={() => {
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
                disabled={editable}
                hidden={!company.id || editable}
                onClick={() => {
                    history.push({
                        pathname: "/companies/" + company.id,
                        search: "?edit=true"
                    });
                }}
            >
                Edit Company
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                hidden={!company.id || editable}
                onClick={() => {
                    history.push({
                        pathname: "/companies/new",
                        search: "?edit=true"
                    });
                }}
            >
                New Company
            </Button>
            <Button
                type="button"
                color="danger"
                size="sm"
                className="waves-effect mr-2 mb-3"
                onClick={onDelete}
                hidden={!company.id || !editable}
            >
                Delete Company
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                hidden={!company.id || editable}
                outline={true}
                onClick={() => {
                    history.push("/companies");
                }}
            >
                Companies
            </Button>
        </React.Fragment>
    );
}