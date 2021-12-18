import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
    Button
} from "reactstrap";

export default function Toolbar({ editable, changed, onSave, onDelete }) {
    const history = useHistory();

    const ingredient = useSelector(state => {
        return state.Ingredient.data;
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
                data-testid="ingredient-save"
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
                data-testid="ingredient-cancel"
            >
                Cancel
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                disabled={editable}
                hidden={!ingredient.id || editable}
                onClick={() => {
                    history.push({
                        pathname: "/materials/ingredients/" + ingredient.id,
                        search: "?edit=true"
                    });
                }}
                data-testid="ingredient-edit"
            >
                Edit Ingredient
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                hidden={!ingredient.id || editable}
                onClick={() => {
                    history.push({
                        pathname: "/materials/ingredients/new",
                        search: "?edit=true"
                    });
                }}
            >
                New Ingredient
            </Button>
            <Button
                type="button"
                color="danger"
                size="sm"
                className="waves-effect mr-2 mb-3"
                onClick={onDelete}
                hidden={!ingredient.id || !editable}
                data-testid="ingredient-delete"
            >
                Delete Ingredient
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                hidden={!ingredient.id || editable}
                outline={true}
                onClick={() => {
                    history.push("/materials/ingredients");
                }}
                data-testid="ingredient-Ingredients"
            >
                Ingredients
            </Button>
        </React.Fragment>
    );
}