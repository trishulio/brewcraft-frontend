import React from "react";
import {
  Row,
  Col,
  Alert
} from "reactstrap";
import Toolbar from "./components/toolbar";
import UserDetails from "./components/details";
import { useSelector } from "react-redux";

export default function User({ category, editable, changed, onSave, onEdit, onDelete }) {

    const error = useSelector(state => {
        return state.User.error
    });

    return (
        <React.Fragment>
            <Toolbar
                category={category}
                editable={editable}
                changed={changed}
                onSave={onSave}
                onEdit={onEdit}
                onDelete={onDelete}
            />
            <Row>
            <Col md={9} xl={8}>
                    {error &&
                        <Alert color="info" className="mt-2 mb-4">
                            <strong>Oh snap!</strong> Change a few things up and try submitting again.
                        </Alert>
                    }
                    <UserDetails
                        editable={editable}
                        onSave={onSave}
                        changed={changed}
                    />
                </Col>
            </Row>
        </React.Fragment>
    );
}