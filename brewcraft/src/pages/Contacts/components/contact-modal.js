import React, { useState } from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Row, Col, Card, CardBody, Button ,ModalFooter} from "reactstrap";

export default function Contact({ data, close, optionsList }) {
  const [contact, setContact] = useState(data);

  const handleSubmit = (event, values) => {
    debugger;
    close(true, values);
  };

  return (
    <AvForm onValidSubmit={handleSubmit} model={contact}>
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
                name="lastName"
                label="Last Name*"
                placeholder="Enter Last Name"
                type="text"
                errorMessage="Enter Last Name"
                validate={{ required: { value: true } }}
              />
            </Col>
            <Col lg="6">
              <AvField
                name="phoneNumber"
                label="Phone*"
                placeholder="Enter Phone"
                type="text"
                errorMessage="Enter Valid Phone"
                validate={{ tel: true }}
              />
            </Col>
            <Col lg="6">
              <AvField
                name="email"
                label="Email*"
                placeholder="Enter Email"
                type="text"
                errorMessage="Enter Valid Email"
                validate={{ email: true }}
              />
            </Col>

            <Col lg="6">
            <AvField type="select" name="supplier" label="Company" default validate={{ required: {value: false, errorMessage: 'Please select a valid company'}}} >
              <option disabled value="">Select Company</option>
              {optionsList}
            </AvField>
            </Col>

          </Row>
        </CardBody>
        <ModalFooter>
          <Button
            type="submit"
            color="secondary"
            className="waves-effect"
          >
            Save
          </Button>
        </ModalFooter>
      </Card>
    </AvForm>
  );
}
