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
import { useSelector } from "react-redux";

export default function PurchaseInvoiceForm({ editable }) {

    const invoice = useSelector(state => {
        return state.PurchaseInvoice.data;
    });

    const suppliers = useSelector(state => {
        return state.Suppliers.all;
    });

    const materials = useSelector(state => {
        return [];
    })

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