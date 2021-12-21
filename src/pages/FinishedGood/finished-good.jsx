import React from "react";
import { Row, Col } from "reactstrap";
import Toolbar from "./components/toolbar";
import FinishedGoodDetails from "./components/details";
// import FinishedGoodImage from "./components/image";

export default function FinishedGood({ editable, changed, onSave, onDelete }) {
    return (
        <React.Fragment>
            <Toolbar
                editable={editable}
                changed={changed}
                onSave={onSave}
                onDelete={onDelete}
            />
            <Row>
                <Col md={9} xl={8}>
                    <FinishedGoodDetails editable={editable} />
                </Col>
                {/* <Col md="3">
                    <FinishedGoodImage editable={editable} />
                </Col> */}
            </Row>
        </React.Fragment>
    );
}
