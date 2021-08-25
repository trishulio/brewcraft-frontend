import React from "react";
import {
  Row,
  Col,
  Button
} from "reactstrap";
import Toolbar from "./components/toolbar";
import SupplierDetails from "./components/details";

export default function Supplier({ editable, changed, onSave, onDelete }) {
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
                    <SupplierDetails
                        editable={editable}
                    />
                </Col>
            </Row>
        </React.Fragment>
    );
}