import React from "react";
import { Col, Row, Card, CardBody } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Button, ModalFooter } from "reactstrap";
import { get } from "lodash";

export default function Contact({
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
                    name="username"
                    label="First name*"
                    placeholder="First name"
                    type="text"
                    errorMessage="Enter First name"
                    validate={{ required: { value: true } }}
                    value={type == "edit" && get(formData, "username")}
                  />

                  <AvField
                    name="last_name"
                    label="Last name*"
                    placeholder="Last name"
                    type="text"
                    errorMessage="Enter Last name"
                    validate={{ required: { value: true } }}
                    value={type == "edit" && get(formData, "last_name")}
                  />

                  <AvField
                    name="phone_number"
                    label="Phone number"
                    placeholder="Enter phone number"
                    type="number"
                    errorMessage="Enter valid phone number"
                    value={type == "edit" && get(formData, "phone_number")}
                    validate={{
                      required: { value: false },
                      pattern: {
                        value: "^[0-9]+$",
                        errorMessage: "Only Numbers",
                      },
                    }}
                  />

                  <AvField
                    name="phone_number_extension"
                    label="Phone Number Extension"
                    placeholder="Enter Phone Number Extension"
                    type="number"
                    errorMessage="Enter valid Phone Number Extension"
                    value={
                      type == "edit" && get(formData, "phone_number_extension")
                    }
                    validate={{
                      required: { value: false },
                      pattern: {
                        value: "^[0-9]+$",
                        errorMessage: "Only Numbers",
                      },
                    }}
                  />

                  <AvField
                    name="industry"
                    label="Industry"
                    placeholder="Enter Industry"
                    type="text"
                    errorMessage="Enter Industry"
                    validate={{ required: { value: false } }}
                    value={type == "edit" && get(formData, "industry")}
                  />

                  <AvField
                    name="street_address"
                    label="Street address"
                    placeholder="Enter Street address"
                    type="text"
                    errorMessage="Enter Street address"
                    validate={{ required: { value: false } }}
                    value={type == "edit" && get(formData, "street_address")}
                  />

                  <AvField
                    name="stat_region"
                    label="Stat/Region"
                    placeholder="Enter Stat/Region"
                    type="text"
                    errorMessage="Enter Stat/Region"
                    validate={{ required: { value: false } }}
                    value={type == "edit" && get(formData, "stat_region")}
                  />
                </Col>
                <Col lg="6">
                  <AvField
                    name="email"
                    label="Email*"
                    placeholder="Enter Valid Email"
                    type="email"
                    errorMessage="Invalid Email"
                    validate={{
                      required: { value: true },
                      email: { value: true },
                    }}
                    value={type == "edit" && get(formData, "email")}
                  />
                  <AvField
                    name="Job_title"
                    label="Job title"
                    placeholder="Job title"
                    type="text"
                    errorMessage="Enter Job title"
                    validate={{ required: { value: false } }}
                    value={type == "edit" && get(formData, "Job_title")}
                  />

                  <AvField
                    name="mobile_phone_number"
                    label="Mobile phone number"
                    placeholder="Enter Mobile phone number"
                    type="number"
                    errorMessage="Enter valid Mobile phone number"
                    value={
                      type == "edit" && get(formData, "mobile_phone_number")
                    }
                    validate={{
                      required: { value: false },
                      pattern: {
                        value: "^[0-9]+$",
                        errorMessage: "Only Numbers",
                      },
                    }}
                  />

                  <AvField
                    name="Contact_owner"
                    label="Contact owner"
                    placeholder="Enter Contact owner"
                    type="text"
                    errorMessage="Enter Contact owner"
                    validate={{ required: { value: false } }}
                    value={type == "edit" && get(formData, "Contact_owner")}
                  />

                  <AvField
                    name="city"
                    label="City"
                    placeholder="Enter City"
                    type="text"
                    errorMessage="Enter City"
                    validate={{ required: { value: false } }}
                    value={type == "edit" && get(formData, "city")}
                  />

                  <AvField
                    name="origin_of_lead"
                    label="Origin of Lead"
                    placeholder="Enter Origin of Lead"
                    type="text"
                    errorMessage="Enter Origin of Lead"
                    validate={{ required: { value: false } }}
                    value={type == "edit" && get(formData, "origin_of_lead")}
                  />
                </Col>
              </Row>
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
