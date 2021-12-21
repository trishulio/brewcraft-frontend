import React from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Row, Col, Card, CardBody, Button, ModalFooter } from "reactstrap";
import { map } from "lodash";

export default function EquipmentForm({
    close,
    formModal,
    equipmentTypes,
    facilities,
}) {
    const handleSubmit = (event, values) => {
        close(true, values);
    };

    const units = ["hl", "l", "ml", "kg", "g"];

    return (
        <AvForm onValidSubmit={handleSubmit} model={formModal}>
            <Card>
                <CardBody>
                    <Row>
                        <Col lg="12">
                            <AvField
                                name="name"
                                label="Name"
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
                                label="Equipment Type"
                                placeholder="Type"
                                errorMessage="Type"
                                validate={{ required: { value: true } }}
                            >
                                <option disabled value="">
                                    Select Equipment Type
                                </option>
                                {map(equipmentTypes, (value, index) => (
                                    <option value={value} key={index}>
                                        {value}
                                    </option>
                                ))}
                            </AvField>
                        </Col>
                        <Col lg="12">
                            <AvField
                                type="select"
                                name="facility"
                                label="Facility"
                                placeholder="Facility"
                                errorMessage="Facility"
                                validate={{ required: { value: true } }}
                            >
                                <option disabled value="">
                                    Select Facility
                                </option>
                                {map(facilities, (value, index) => (
                                    <option value={value.id} key={index}>
                                        {value.name}
                                    </option>
                                ))}
                            </AvField>
                        </Col>
                        <Col lg="6">
                            <AvField
                                name="maxCapacity.value"
                                label="Capacity"
                                placeholder="Capacity"
                                type="text"
                                errorMessage="Enter Capacity"
                                validate={{ required: { value: true } }}
                            />
                        </Col>
                        <Col lg="6">
                            <AvField
                                type="select"
                                name="maxCapacity.symbol"
                                label="Unit"
                                placeholder="Unit"
                                errorMessage="Enter Unit"
                                validate={{ required: { value: true } }}
                            >
                                <option disabled value="">
                                    Select Unit
                                </option>
                                {map(units, (value, index) => (
                                    <option value={value} key={value}>
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
