import React from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Row, Col, Card, CardBody, Button, ModalFooter } from "reactstrap";
/**
 * 
 * @param {Function} companySubmit Mandatory 
 * @param {Function} close Mandatory
 * @param {Object} FormModal Mandatory
 * 
 */
export default function FacilityForm({ companySubmit, close, formModel }) {
  return (
    <AvForm onValidSubmit={companySubmit} model={formModel}>
      <Card>
        <CardBody>
          <Row>
            <Col lg="6">
              <AvField
                name="name"
                label="Name"
                placeholder="Name"
                type="text"
                errorMessage="Enter Name"
                validate={{ required: { value: true } }}
              />
            </Col>
            <Col lg="6">
              <AvField
                name="phoneNumber"
                label="Phone Number"
                placeholder="Phone Number"
                type="text"
                errorMessage="Please Insert a valid Phone Number."
                validate={{ required: { value: true } }}
              />
            </Col>
            <Col lg="6">
              <AvField
                name="address.addressLine1"
                label="Address Line1"
                placeholder="Address Line1"
                type="text"
                validate={{ required: { value: true } }}
              />
            </Col>
            <Col lg="6">
              <AvField
                name="address.addressLine2"
                label="Address Line2"
                placeholder="Address Line2"
                type="text"
                validate={{ required: { value: true } }}
              />
            </Col>
            <Col lg="6">
              <AvField
                name="address.country"
                label="Country"
                placeholder="Country"
                type="text"
                validate={{ required: { value: true } }}
              />
            </Col>
            <Col lg="6">
              <AvField
                name="address.province"
                label="Province"
                placeholder="Province"
                type="text"
                validate={{ required: { value: true } }}
              />
            </Col>
            <Col lg="6">
              <AvField
                name="address.city"
                label="City"
                placeholder="City"
                type="text"
                errorMessage="Please insert a valid City"
                validate={{ required: { value: true } }}
              />
            </Col>
            <Col lg="6">
              <AvField
                name="address.postalCode"
                label="Postal Code"
                placeholder="Postal Code"
                type="text"
                errorMessage="Please insert a valid Postal Code"
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
          >
            Save changes
          </Button>
        </ModalFooter>
      </Card>
    </AvForm>
  );
}
