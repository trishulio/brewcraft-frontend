import React from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Row, Col, Card, CardBody, Button, ModalFooter } from "reactstrap";

export default function NewMaterial({ submitFn, close, optionsList, model }) {
  return (
    <AvForm onValidSubmit={submitFn} model={model}>
      <Card>
        <CardBody>
          <Row>
            <Col lg="6">
              <AvField
                name="firstName"
                label="First Name*"
                placeholder="Enter First Name"
                type="text"
                errorMessage="Enter First Name"
                validate={{ required: { value: true } }}
              />
            </Col>

            <Col lg="6">
              <AvField
                type="select"
                name="supplier"
                label="Company"
                default
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Please select a valid company",
                  },
                }}
              >
                <option disabled value="">
                  Select Company
                </option>
                {optionsList}
              </AvField>
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
