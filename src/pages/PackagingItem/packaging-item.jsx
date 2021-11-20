import React from "react";
import {
  Row,
  Col
} from "reactstrap";
import Toolbar from "./components/toolbar";
import PackagingItemDetails from "./components/details";
// import PackagingItemImage from "./components/image";


export default function PackagingItem({ editable, changed, onSave, onDelete }) {
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
                    <PackagingItemDetails
                        editable={editable}
                    />
                </Col>
                {/* <Col md="3">
                    <PackagingItemImage editable={editable} />
                </Col> */}
            </Row>
        </React.Fragment>
    );
}