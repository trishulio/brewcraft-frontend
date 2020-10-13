import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import Vendorsection from './vendorsection'
import Itemsection from './itemsection'
import {omit,get} from 'lodash';
export default function InvoiceForm({ detail }) {
  return (
    <Row>
      <Col>
        <Card>
          <CardBody>
            <Row>
              <Col>
                <h5>Edit bill</h5>
              </Col>
              <Col>
                <span className="float-right">Delete Btn</span>
              </Col>
            </Row>
              <Vendorsection vendor={omit(detail,'item_list')} />
              <Itemsection item={get(detail,'item_list')} />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}
