import React from "react";
import Toolbar from "./components/toolbar";
import Invoice from "./components/invoice";
import { Col, Row } from "reactstrap";

export default function PurchaseInvoice({ editable, changed, onSave, onDelete }) {
    return (
        <React.Fragment>
            <Toolbar
                editable={editable}
                changed={changed}
                onSave={onSave}
                onDelete={onDelete}
            />
            <Row>
                <Col xl={10}>
                    <Invoice editable={editable} />
                </Col>
            </Row>
        </React.Fragment>
    );
}