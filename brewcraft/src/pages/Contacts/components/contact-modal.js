import React from "react";
import { Link } from "react-router-dom";
import { map } from "lodash";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Row, Col, Card, CardBody, Button, ModalFooter} from "reactstrap";

export default function Contact({ contact, companies, companiesDialog, close }) {

  const handleSubmit = (event, values) => {
    close(true, values);
  };

  return (
    <AvForm onValidSubmit={handleSubmit} model={contact}>
      <Card>
        <CardBody>
          <Row>
            <Col xs="12">
              <AvField
                name="firstName"
                label="First Name"
                placeholder="Enter First Name"
                type="text"
                errorMessage="Enter First Name"
                validate={{ required: { value: true } }}
              />
            </Col>
            <Col xs="12">
              <AvField
                name="lastName"
                label="Last Name"
                placeholder="Enter Last Name"
                type="text"
                errorMessage="Enter Last Name"
                validate={{ required: { value: true } }}
              />
            </Col>
            <Col xs="12">
              <AvField
                name="phoneNumber"
                label="Phone"
                placeholder="Enter Phone"
                type="text"
                errorMessage="Enter Valid Phone"
                validate={{ tel: true }, { required: { value: true }}}
              />
            </Col>
            <Col xs="12">
              <AvField
                name="email"
                label="Email"
                placeholder="Enter Email"
                type="text"
                errorMessage="Enter Valid Email"
                validate={{ email: true }, { required: { value: true }}}
              />
            </Col>
          </Row>
          <Row className="container-fluid d-flex row-no-padding full-height align-items-center justify-content-center">
            <Col lg="6" style={{paddingLeft: 0}}>
            <AvField type="select" name="supplier" label="Company" default validate={{ required: {value: false, errorMessage: 'Please select a valid company'}}} >
              <option disabled value="">Select Company</option>
              {
                map(companies, (value, index) => (
                  <option value={value.id} key={index}>
                    {value.name}
                  </option>
                ))
              }
            </AvField>
            </Col>
            <Col lg="6">
              <Link to="#" className="mt-1" onClick={companiesDialog}>Add Company</Link>
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
            className="waves-effect"
          >
            Save
          </Button>
        </ModalFooter>
      </Card>
    </AvForm>
  );
}
