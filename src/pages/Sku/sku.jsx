import React from "react";
import { Row, Col, Alert } from "reactstrap";
import Toolbar from "./components/toolbar";
import SkuDetails from "./components/details";
import { useSelector } from "react-redux";

export default function Sku({
    category,
    editable,
    changed,
    onSave,
    onEdit,
    onDelete,
}) {
    const error = useSelector((state) => {
        return state.Sku.error;
    });

    return (
        <React.Fragment>
            <Toolbar
                category={category}
                editable={editable}
                changed={changed}
                onSave={onSave}
                onEdit={onEdit}
                onDelete={onDelete}
            />
            <Row>
                <Col lg={8}>
                    {error && (
                        <Alert color="info" className="mt-2 mb-4">
                            <strong>Oh snap!</strong> Change a few things up and
                            try submitting again.
                        </Alert>
                    )}
                    <SkuDetails editable={editable} />
                </Col>
                {/* <Col sm={6} md={3}>
                    <SkuImage editable={editable} />
                </Col> */}
            </Row>
        </React.Fragment>
    );
}
