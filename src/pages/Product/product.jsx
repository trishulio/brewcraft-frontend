import React from "react";
import { Row, Col, Alert } from "reactstrap";
import Toolbar from "./components/toolbar";
import ProductDetails from "./components/details";
import ProductImage from "./components/image";
import { useSelector } from "react-redux";

export default function Product({
    product,
    editable,
    changed,
    onSave,
    onDelete,
}) {
    const error = useSelector((state) => {
        return state.Product.error;
    });

    return (
        <React.Fragment>
            <Toolbar
                product={product}
                editable={editable}
                changed={changed}
                onSave={onSave}
                onDelete={onDelete}
            />
            <Row>
                <Col md={9} xl={8}>
                    {error && (
                        <Alert color="info" className="mt-2 mb-4">
                            <strong>Oh snap!</strong> Change a few things up and
                            try submitting again.
                        </Alert>
                    )}
                    <ProductDetails product={product} editable={editable} />
                </Col>
                <Col md="3">
                    <ProductImage editable={editable} />
                </Col>
            </Row>
        </React.Fragment>
    );
}
