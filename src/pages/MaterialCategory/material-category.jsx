import React from "react";
import {
  Row,
  Col
} from "reactstrap";
import Toolbar from "./components/toolbar";
import MaterialCategoryDetails from "./components/details";

export default function MaterialCategory({ editable, changed, onSave, onDelete }) {
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
                    <MaterialCategoryDetails
                        editable={editable}
                    />
                </Col>
            </Row>
        </React.Fragment>
    );
}