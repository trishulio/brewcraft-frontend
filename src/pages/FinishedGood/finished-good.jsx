import React from "react";
import { Row, Col } from "reactstrap";
import Toolbar from "./components/toolbar";
import FinishedGoodDetails from "./components/details";

export default function FinishedGood({
    editable,
    changed,
    onSave,
    onDelete,
    repackageMode,
}) {
    return (
        <React.Fragment>
            <Toolbar
                editable={editable}
                changed={changed}
                onSave={onSave}
                onDelete={onDelete}
                repackageMode={repackageMode}
            />
            <Row>
                <Col md={9} xl={8}>
                    <FinishedGoodDetails
                        editable={editable}
                        repackageMode={repackageMode}
                    />
                </Col>
                {/* <Col md="3">
                    <FinishedGoodImage editable={editable} />
                </Col> */}
            </Row>
        </React.Fragment>
    );
}
