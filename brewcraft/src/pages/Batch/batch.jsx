import React from "react";
import {
  Row,
  Col,
} from "reactstrap";
import Metadata from "./components/metadata";
import BrewDetails from "./components/brew-details";
import Details from "./components/details";
import Toolbar from "./components/toolbar";

export default function Batch(props) {
    return (
        <React.Fragment>
            <Toolbar {...props} />
            <Row>
                <Col xl={8}>
                    <Metadata {...props} />
                    <BrewDetails {...props} />
                </Col>
                <Col md={4}>
                    <Details {...props}/>
                </Col>
            </Row>
        </React.Fragment>
    );
}