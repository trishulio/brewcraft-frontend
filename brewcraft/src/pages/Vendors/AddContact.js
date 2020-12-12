import React from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Row, Col, Card, CardBody, Button ,ModalFooter} from "reactstrap";

export default function AddContact({ companyContact,close }) {
  return (
    <AvForm onValidSubmit={companyContact}>
      <Card>
        <CardBody>
          <Row>
            <Col lg="6">
              <AvField
                name="contact"
                label="First Name*"
                placeholder="Enter First Name"
                type="text"
                errorMessage="Enter First Name"
                validate={{ required: { value: true } }}
              />
            </Col>
            <Col lg="6">
              <AvField
                name="last"
                label="Last Name*"
                placeholder="Enter Last Name"
                type="text"
                errorMessage="Enter Last Name"
                validate={{ required: { value: true } }}
              />
            </Col>
            <Col lg="6">
              <AvField
                name="phone"
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
            <AvField type="select" name="cname" label="Company">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
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
