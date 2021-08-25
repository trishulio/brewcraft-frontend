import React from "react";
import {
  Row,
  Col
} from "reactstrap";
import Toolbar from "./components/toolbar";
import ProductDetails from "./components/details";
import ProductImage from "./components/image";


export default function Product({ product, editable, changed, onSave, onDelete, onLeave }) {
    return (
        <React.Fragment>
            <Toolbar
                product={product}
                editable={editable}
                changed={changed}
                onSave={onSave}
                onDelete={onDelete}
                onLeave={onLeave}
            />
            <Row>
                <Col md={9} xl={8}>
                    <ProductDetails
                        product={product}
                        editable={editable}
                    />
                </Col>
                <Col md="3">
                    <ProductImage editable={editable} />
                </Col>
            </Row>
        </React.Fragment>
    );
}