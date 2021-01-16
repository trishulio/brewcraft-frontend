import React from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Row, Col, Card, CardBody, Button, ModalFooter } from "reactstrap";

export default function EquipmentForm({ companySubmit, close }) {
  return (
    <AvForm onValidSubmit={companySubmit}>
      <Card>
        <CardBody>
          <Row>
            <Col lg="12">
              <AvField
                name="Name"
                label="Name*"
                placeholder="Name"
                type="text"
                errorMessage="Enter Name"
                validate={{ required: { value: true } }}
              />
            </Col>
            <Col lg="12">
              <AvField
                name="Type"
                label="Type"
                placeholder="Type"
                type="text"
                errorMessage="Type"
                validate={{ required: { value: true } }}
              />
            </Col>
            <Col lg="12">
              <AvField
                name="Capacity"
                label="Capacity*"
                placeholder="Capacity"
                type="text"
                errorMessage="Enter Capacity"
                validate={{ required: { value: true } }}
              />
            </Col>
          </Row>
        </CardBody>
        <ModalFooter>
          <Button
            type="reset"
            color="secondary"
            className="waves-effect"
            onClick={close}
          >
            Close
          </Button>
          <Button
            type="submit"
            color="primary"
            className="waves-effect waves-light"
            // disabled={forstatus.loading}
          >
            Save changes
          </Button>
        </ModalFooter>
      </Card>
    </AvForm>
  );
}
