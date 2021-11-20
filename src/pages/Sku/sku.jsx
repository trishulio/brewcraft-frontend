import React from "react";
import {
  Row,
  Col
} from "reactstrap";
import Toolbar from "./components/toolbar";
import SkuDetails from "./components/details";

export default function Sku({ category, editable, changed, onSave, onEdit, onDelete }) {
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
                    <SkuDetails
                        editable={editable}
                    />
                </Col>
                {/* <Col sm={6} md={3}>
                    <SkuImage editable={editable} />
                </Col> */}
            </Row>
        </React.Fragment>
    );
}