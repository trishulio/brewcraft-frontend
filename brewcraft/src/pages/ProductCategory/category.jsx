import React from "react";
import {
  Row,
  Col
} from "reactstrap";
import Toolbar from "./components/toolbar";
import ProductCategoryDetails from "./components/details";

export default function ProductCategory({ category, editable, changed, onSave, onEdit, onDelete }) {
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
                    <ProductCategoryDetails
                        editable={editable}
                    />
                </Col>
                {/* <Col sm={6} md={3}>
                    <ProductCategoryImage editable={editable} />
                </Col> */}
            </Row>
        </React.Fragment>
    );
}