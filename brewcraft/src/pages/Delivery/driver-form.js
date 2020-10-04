import React from "react";
import { Col, Row, Card, CardBody, FormGroup, Label,Alert } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Button, ModalFooter } from "reactstrap";
import { get } from "lodash";

export default function DriverForm({ submit, invalid, close, forstatus }) {
  return (
    <Row>
      <Col lg="12">
        <AvForm onValidSubmit={submit} onInvalidSubmit={invalid}>
          <Card>
            <CardBody>
              <Row>
                <Col lg="6">
                  <AvField
                    name="name"
                    label="Name*"
                    placeholder="Name"
                    type="text"
                    errorMessage="Enter name"
                    validate={{ required: { value: true } }}
                  />

                  <AvField
                    name="company"
                    label="Company"
                    placeholder="Enter company"
                    type="text"
                    errorMessage="Enter valid company"
                    validate={{
                      required: { value: false },
                    }}
                  />

                  <AvField
                    name="phone"
                    label="Phone"
                    placeholder="Enter phone"
                    type="text"
                    errorMessage="Enter valid Phone"
                    validate={{
                      required: { value: true },
                      pattern: {
                        value: "^[0-9]+$",
                        errorMessage: "Only Numbers",
                      },
                    }}
                  />
                  <AvField
                    name="last_location"
                    label="Last location"
                    placeholder="Enter Stat/Region"
                    type="text"
                    errorMessage="Enter Stat/Region"
                    validate={{ required: { value: false } }}
                  />
                </Col>
                <Col lg="6">
                  <AvField
                    name="license_plate"
                    label="License plate*"
                    placeholder="License plate"
                    type="text"
                    errorMessage="Enter License plate"
                    validate={{ required: { value: true } }}
                  />
                  <AvField
                    name="last_active"
                    label="Last active"
                    placeholder="Enter Last active"
                    type="text"
                    errorMessage="Enter valid Last active"
                    validate={{
                      required: { value: false },
                    }}
                  />
                  <AvField
                    name="email"
                    label="Email"
                    placeholder="Enter Email"
                    type="email"
                    errorMessage="Enter valid Email"
                    validate={{
                      required: { value: true, email: { value: true } },
                    }}
                  />
                  <FormGroup>
                    <Label>Upload Driver Image</Label>
                    <input
                      type="file"
                      className="filestyle"
                      data-buttonname="btn-secondary"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <ModalFooter>
              {
                get(forstatus, 'error') &&  <Alert color="danger">{ get(forstatus, 'message') } </Alert>
              }
              
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
                  disabled={forstatus.loading}
                >
                  Save changes
                </Button>
              </ModalFooter>
            </CardBody>
          </Card>
        </AvForm>
      </Col>
    </Row>
  );
}
