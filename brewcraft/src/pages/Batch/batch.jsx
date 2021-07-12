import React from "react";
import {
  Row,
  Col,
} from "reactstrap";
import Metadata from "./components/metadata";
import BrewDetails from "./components/brew-details";
import Details from "./components/details";
import Toolbar from "./components/toolbar";

export default function Batch({ batch, editable }) {
    return (
        <React.Fragment>
            <Toolbar batch={batch} editable={editable} />
            <Row>
                <Col md={8} xl={6}>
                    <Metadata brew={batch} editable={editable} />
                    <BrewDetails brew={batch} editable={editable} />
                </Col>
                <Col md={4}>
                    <Details item={batch} editable={editable}/>
                </Col>
            </Row>
        </React.Fragment>
    );
}