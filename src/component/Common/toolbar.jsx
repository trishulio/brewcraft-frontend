import React from "react";
import {
    Row,
    Col
} from "reactstrap";

export default function Toolbar({ children }) {
    return (
        <Row>
            <Col xs="12">
                {children}
            </Col>
        </Row>
    );
}