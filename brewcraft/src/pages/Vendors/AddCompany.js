import React from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Row, Col, Card, CardBody, Button ,ModalFooter} from "reactstrap";

export default function AddCompany({ companySubmit,close }) {
  return (
    <AvForm onValidSubmit={companySubmit}>
      <Card>
        <CardBody>
          <Row>
            <Col lg="12">
              <AvField
                name="cName"
                label="Company Name*"
                placeholder="Company Name"
                type="text"
                errorMessage="Enter Company Name"
                validate={{ required: { value: true } }}
              />
            </Col>
            <Col lg="6">
              <AvField
                name="addressLine1"
                label="Address Line 1"
                placeholder="Address line 1"
                type="text"
               />
            </Col>
            <Col lg="6">
              <AvField
                name="addressLine2"
                label="Aaddress Line 2"
                placeholder="Address line 2"
                type="text"
               />
            </Col>
            <Col lg="6">
              <AvField
                name="country"
                label="Country"
                placeholder="Country"
                type="text"
               />
            </Col>
            <Col lg="6">
              <AvField
                name="province"
                label="Province"
                placeholder="Province"
                type="text"
               />
            </Col>
            <Col lg="6">
              <AvField
                name="city"
                label="City"
                placeholder="City"
                type="text"
               />
            </Col>
            <Col lg="6">
              <AvField
                name="postalCode"
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
