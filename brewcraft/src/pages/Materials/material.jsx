import React, { useEffect, Fragment, useState, useCallback } from "react";
import { get, map } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
  Table
} from "reactstrap";
import { MDBDataTable } from "mdbreact";

export default function Material() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            // TODO: Dynamically set Material Name
            setBreadcrumbItems("Chocolate Hops", [
                // TODO: Dynamically set breadcrumb based on material category (ingredient of packaging)
                { title: "Ingredients", link: "/ingredients" },
                { title: "Hops", link: "#" },
                { title: "Chocolate Hops", link: "#" },
                // { title: "Packaging", link: "/packaging" }
            ])
            );
        }, []);

    const purchaseInvoicesColumns = [{
        label: "Invoice Number",
        field: "invoiceNumber",
        sort: "asc",
        width: 300
    }, {
        label: "Supplier",
        field: "supplier",
        sort: "asc",
        width: 300
    }, {
        label: "Lot",
        field: "lot",
        sort: "asc",
        width: 300
    }, {
        label: "Quantity",
        field: "quantity",
        sort: "asc",
        width: 300
    }, {
        label: "Price",
        field: "price",
        sort: "asc",
        width: 300
    }, {
        label: "Date Received",
        field: "received",
        sort: "asc",
        width: 300
    }];

    return (
        <Fragment>
            <Row>
                <Col md="6">
                    <Card>
                        <CardHeader>Material Details</CardHeader>
                        <CardBody>
                            {/* <h4 className="mb-4 card-title">Material Details</h4> */}
                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Name</th>
                                            <td>Chocolate Hops</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Description</th>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Category</th>
                                            <td>Hops</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">UPC</th>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Unit of Measure</th>
                                            <td>kg</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                            <Button
                                type="submit"
                                color="primary"
                                className="waves-effect waves-light float-right"
                            >
                                Edit Details
                            </Button>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="6">
                    <Card>
                        <CardHeader>Material Quantity</CardHeader>
                        <CardBody>
                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <tbody>
                                        <tr>
                                            <th scope="row">On Hand</th>
                                            <td>0 kg</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Reserved</th>
                                            <td>0 kg</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Available</th>
                                            <td>0 kg</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col xs="12">
                    <Card>
                        <CardHeader>Purchase Invoices</CardHeader>
                        <CardBody>
                            <MDBDataTable
                                responsive
                                bordered
                                data={{
                                    columns: purchaseInvoicesColumns,
                                    rows: [],
                                }}
                                />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
}