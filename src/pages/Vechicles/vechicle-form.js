import React from "react";
import { Col, Row, Card, CardBody, FormGroup, Label, Alert } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Button, ModalFooter } from "reactstrap";
import { get } from "lodash";

export default function VechicleForm({
  submit,
  invalid,
  close,
  forstatus,
  predata,
}) {
  const { formData, type } = predata;

  return (
    <Row>
      <Col lg="12">
        <AvForm onValidSubmit={submit} onInvalidSubmit={invalid}>
          <Card>
            <CardBody>
              <Row>
                <Col lg="6">
                  <AvField
                    name="Model"
                    label="Model*"
                    placeholder="Enter the vechicle Model"
                    type="text"
                    errorMessage="Enter the vechicle Model"
                    validate={{ required: { value: true } }}
                    value={type === "edit" && get(formData, "[0]Model")}
                  />
                  <AvField
                    name="Make"
                    label="Make"
                    placeholder="Enter vechicle Make"
                    type="text"
                    errorMessage="Enter vechicle Make"
                    value={type === "edit" && get(formData, "[0]Make")}
                    validate={{
                      required: { value: true },
                    }}
                  />
                </Col>
                <Col lg="6">
                  <AvField
                    name="license_plate"
                    label="License no*"
                    placeholder="Pleas enter License no"
                    type="text"
                    errorMessage="Pleas enter License no"
                    value={type === "edit" && get(formData, "[0]license_plate")}
                    validate={{ required: { formData: true } }}
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
                {get(forstatus, "error") && (
                  <Alert color="danger">{get(formData, "[0]message")} </Alert>
                )}

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
