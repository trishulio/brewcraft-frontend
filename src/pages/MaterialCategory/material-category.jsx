import React from "react";
import {
  Row,
  Col,
  Alert
} from "reactstrap";
import Toolbar from "./components/toolbar";
import MaterialCategoryDetails from "./components/details";
import { useSelector } from "react-redux";

export default function MaterialCategory({ editable, changed, onSave, onDelete }) {

    const error = useSelector(state => {
        return state.MaterialCategory.error;
    });

    return (
        <React.Fragment>
            <Toolbar
                editable={editable}
                changed={changed}
                onSave={onSave}
                onDelete={onDelete}
            />
            <Row>
                <Col md={9} xl={8}>
                    {error &&
                        <Alert color="info" className="mt-2 mb-4">
                            <strong>Oh snap!</strong> Change a few things up and try submitting again.
                        </Alert>
                    }
                    <MaterialCategoryDetails
                        editable={editable}
                    />
                </Col>
            </Row>
        </React.Fragment>
    );
}