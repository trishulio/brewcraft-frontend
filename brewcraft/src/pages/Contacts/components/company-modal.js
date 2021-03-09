import React from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Row, Col, Card, CardBody, Button , ModalFooter } from "reactstrap";

export default function AddCompany({ company, close }) {

  const handleSubmit = (event, values) => {
    close(true, values);
  };

  return (
    <AvForm onValidSubmit={handleSubmit} model={company}>
      <Card>
        <CardBody>
          <Row>
            <Col lg="12">
              <AvField
                name="name"
                label="Company Name"
                placeholder="Company Name"
                type="text"
                errorMessage="Enter Company Name"
                validate={{ required: { value: true } }}
              />
            </Col>
            <Col lg="6">
              <AvField
                name="address.addressLine1"
                label="Address Line 1"
                placeholder="Address line 1"
                type="text"
                validate={{ required: { value: true } }}
               />
            </Col>
            <Col lg="6">
              <AvField
                name="address.addressLine2"
                label="Aaddress Line 2"
                placeholder="Address line 2"
                type="text"
               />
            </Col>
            <Col lg="6">
              <AvField
                name="address.country"
                label="Country"
                placeholder="Country"
                type="text"
               />
            </Col>
            <Col lg="6">
              <AvField
                name="address.province"
                label="Province"
                placeholder="Province"
                type="text"
               />
            </Col>
            <Col lg="6">
              <AvField
                name="address.city"
                label="City"
                placeholder="City"
                type="text"
               />
            </Col>
            <Col lg="6">
              <AvField
                name="address.postalCode"
                label="Postal Code"
                placeholder="Postal Code"
                type="text"
               />
            </Col>
          </Row>
        </CardBody>
        <ModalFooter>
          <Button
            type="reset"
            color="secondary"
            className="waves-effect"
            onClick={() => close(false)}
          >
            Close
          </Button>
          <Button
            type="submit"
            color="primary"
            className="waves-effect waves-light"
          >
            Save changes
          </Button>
        </ModalFooter>
      </Card>
    </AvForm>
  );
}
