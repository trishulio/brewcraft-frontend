import React from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Row
} from "reactstrap";
import Details from "./details";
import Items from "./items";

export default function PurchaseInvoiceForm({ editable }) {
    return (
        <Row>
            <Col>
                <Card>
                    <CardHeader>Purchase Invoice</CardHeader>
                    <CardBody>
                        <Details
                            editable={editable}
                        />
                        <Items
                            editable={editable}
                        />
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
}