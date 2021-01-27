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

export default function EquipmentForm({ companySubmit, close, formModal, type }) {
  return (
    <AvForm onValidSubmit={companySubmit} model={formModal}>
      <Card>
        <CardBody>
          <Row>
            <Col lg="12">
              <AvField
                name="name"
                label="Name*"
                placeholder="Name"
                type="text"
                errorMessage="Enter Name"
                validate={{ required: { value: true } }}
              />
            </Col>
            <Col lg="12">
              <AvField 
                type="select"
                name="type"
                label="Type"
                placeholder="Type"
                errorMessage="Type"
                validate={{ required: { value: true } }}
              >
                <option value="">Select</option>
                {type}
                </AvField>
            </Col>
            <Col lg="12">
              <AvField
                name="maxCapacity.value"
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
