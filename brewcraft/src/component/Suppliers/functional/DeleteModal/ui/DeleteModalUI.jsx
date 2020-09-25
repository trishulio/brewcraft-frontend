import React from 'react';
import { Row, Col, FormGroup, Label, Button } from 'reactstrap';
import Select from 'react-select';

export const DeleteModalUI = ({vendors, handleDelete, handleVendorChange}) => {
    return <Row>
        <Col xs="12">
            <FormGroup row>
                <Label
                    for="name"
                    className="col-sm-12 col-form-label">Select Vendor</Label>
                <Select name="vendor" id="vendor"
                onChange={handleVendorChange}
                className="w-100"
                options={vendors}/>
            </FormGroup>
            <Button onClick={handleDelete}>Delete</Button>
        </Col>
    </Row>
}