import React from "react";
import { useSelector } from "react-redux";
import { Alert, Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import Details from "./components/details";
import Items from "./components/items";
import Toolbar from "./components/toolbar";

export default function PurchaseInvoice({
    editable,
    changed,
    onSave,
    onDelete,
}) {
    const error = useSelector((state) => {
        return state.Procurement.error;
    });

    return (
        <React.Fragment>
            <Toolbar
                editable={editable}
                changed={changed}
                onSave={onSave}
                onDelete={onDelete}
            />
            <div style={{ maxWidth: "1400px" }}>
                {error && (
                    <Alert color="info" className="mt-2 mb-4">
                        <strong>Oh snap!</strong> Change a few things up and try
                        submitting again.
                    </Alert>
                )}
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>Purchase Invoice</CardHeader>
                            <CardBody>
                                <Details editable={editable} />
                                <Items editable={editable} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    );
}
