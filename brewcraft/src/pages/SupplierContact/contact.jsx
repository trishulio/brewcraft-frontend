import React from "react";
import {
  Row,
  Col
} from "reactstrap";
import Toolbar from "./components/toolbar";
import SupplierContactDetails from "./components/details";

export default function SupplierContact({ editable, changed, onSave, onDelete }) {
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
                    <SupplierContactDetails
                        editable={editable}
                    />
                </Col>
            </Row>
        </React.Fragment>
    );
}