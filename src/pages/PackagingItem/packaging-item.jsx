import React from "react";
import {
  Row,
  Col,
  Alert
} from "reactstrap";
import Toolbar from "./components/toolbar";
import PackagingItemDetails from "./components/details";
import { useSelector } from "react-redux";
// import PackagingItemImage from "./components/image";


export default function PackagingItem({ editable, changed, onSave, onDelete }) {

    const error = useSelector(state => {
        return state.PackagingItem.error;
    });

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
                    {error &&
                        <Alert color="info" className="mt-2 mb-4">
                            <strong>Oh snap!</strong> Change a few things up and try submitting again.
                        </Alert>
                    }
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