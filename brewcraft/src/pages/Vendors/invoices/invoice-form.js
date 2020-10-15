import React from "react";
import { Card, CardBody, Col, Row, Button } from "reactstrap";
import Vendorsection from "./vendorsection";
import Itemsection from "./itemsection";
import { omit, get } from "lodash";
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
            <div className="mt-5">
              <Vendorsection vendor={omit(detail, "item_list")} />
              <Itemsection item={get(detail, "item_list")}/>
              <Button
                type="submit"
                color="primary"
                className="waves-effect waves-light mr-1"
              >
                Submit
              </Button>
              <Button type="reset" color="secondary" className="waves-effect">
                Cancel
              </Button>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}
