import React from 'react';
import { Row, Col, Card, CardBody, FormGroup, Label, Input, Button } from 'reactstrap';

export const CreateModalUI = ({handleCreate, handleInputChange}) => {
    return <Row>
        <Col xs="12">
                <Card>
                    <CardBody>
                        <h4 className="card-title">Create Vendor</h4>
                        <FormGroup row>
                            <Label
                                for="name"
                                className="col-sm-12 col-form-label">Name</Label>
                            <Input className="form-control"
                            onChange={handleInputChange}
                            name="name"
                            type="text" id="name" />
                        </FormGroup>
                        <FormGroup row>
                            <Label
                                for="email"
                                className="col-sm-12 col-form-label">Email</Label>
                            <Input className="form-control"
                            onChange={handleInputChange}
                            name="email"
                            type="text" id="email" />
                        </FormGroup>
                        <FormGroup row>
                            <Label
                                for="directDeposit"
                                className="col-sm-12 col-form-label">Direct Deposit</Label>
                            <Input className="form-control"
                                onChange={handleInputChange}
                                name="directDeposit"
                                type="text" id="directDeposit" />
                        </FormGroup>
                        <FormGroup row>
                            <Label
                                for="actions"
                                className="col-sm-12 col-form-label">Actions</Label>
                            <Input className="form-control"
                            name="actions"
                            onChange={handleInputChange}
                            type="text" id="actions" />
                        </FormGroup>
                        <Button onClick={handleCreate}>Submit</Button>
                    </CardBody>
                </Card>
        </Col>
    </Row>
}