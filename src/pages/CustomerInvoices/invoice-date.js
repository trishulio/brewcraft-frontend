import React, { Fragment } from "react";
import { Row, Col } from "reactstrap";
import { AvField } from "availity-reactstrap-validation";
import { get } from "lodash";
export default function InvoiceDate({ choosefn, customer }) {
    return (
        <Fragment>
            <Row>
                <Col xs="6">
                    <address>
                        <strong>Billed To:</strong>
                        <br />
                        <b>{get(customer, "name", "-")}</b>
                        <br />
                        {get(customer, "address1", "-")}
                        <br />
                        {get(customer, "address2", "-")}
                    </address>
                    <a href="#">Edit Evolve Branding</a>.
                    <a href="#" onClick={choosefn}>
                        {" "}
                        Choose a different customer
                    </a>
                </Col>
                <Col xs="6" className="text-right">
                    <Row>
                        <Col>
                            <Row className="mt-1">
                                <Col>
                                    <strong>Invoice number:</strong>
                                </Col>
                                <Col xs="4">
                                    <AvField
                                        name="invoice_number"
                                        placeholder="invoice number"
                                        type="number"
                                        errorMessage="Enter Name invoice number"
                                        validate={{ required: { value: true } }}
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <Col>
                                    <strong>P.O/S.O number:</strong>
                                </Col>
                                <Col xs="4">
                                    <AvField
                                        name="poso_num"
                                        type="text"
                                        errorMessage="Enter P.O/S.O number"
                                        validate={{ required: { value: true } }}
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <Col>
                                    <strong>Invoice date:</strong>
                                </Col>
                                <Col xs="4">
                                    <AvField
                                        name="invoice_date"
                                        type="date"
                                        errorMessage="Enter invoice date"
                                        validate={{ required: { value: true } }}
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <Col>
                                    <strong>Order Date:</strong>
                                </Col>
                                <Col xs="4">
                                    <AvField
                                        name="order_date"
                                        type="date"
                                        errorMessage=""
                                        validate={{ required: { value: true } }}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Fragment>
    );
}
