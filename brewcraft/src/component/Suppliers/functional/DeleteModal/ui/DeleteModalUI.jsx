import React from 'react';
import { Row, Col, FormGroup, Label } from 'reactstrap';
import Select from 'react-select';
import { ModalActionContainer } from '../../ModalAction/functional/ModalActionContainer';

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
            <ModalActionContainer onSubmit={handleDelete}/>
        </Col>
    </Row>
}