import React from "react";
import {
    Col,
    Row
} from "reactstrap";
import {
    Card,
    CardBody,
    CardHeader
} from "../../../component/Common/Card";
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