import React from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Row, Col, Card, CardBody, Button, ModalFooter } from "reactstrap";
import { map } from "lodash";

export default function StorageForm({ close, formModal }) {
  const handleSubmit = (event, values) => {
    close(true, values);
  };
  const typeSelection = [
    "General", "Hop Storge", "Beer Storage", "Cooler", "Grain Storage"
  ];

  return (
    <AvForm onValidSubmit={handleSubmit} model={formModal}>
      <Card>
        <CardBody>
          <Row>
            <Col lg="12">
              <AvField
                name="name"
                label="Name"
                placeholder="Storage Name "
                type="text"
                errorMessage="Storage Name"
                validate={{ required: { value: true } }}
              />
            </Col>
            <Col lg="12">
              <AvField
                type="select"
                name="type"
                label="Storage Type"
                placeholder="Type"
                errorMessage="Type"
                validate={{ required: { value: true } }}
              >
                <option disabled value="">
                  Select Storage Type
                </option>
                {map(typeSelection, (value, index) => (
                  <option value={value} key={index}>
                    {value}
                  </option>
                ))}
              </AvField>
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

