import React from 'react';
import { MDBDataTable } from 'mdbreact';
import Select from 'react-select'
import { Card, CardBody } from 'reactstrap';

export const SuppliersUI = ({data, actions = [], handleSelectChange}) => {
    return <>
        <Select
            options={actions}
            onChange={handleSelectChange}
            placeholder="Select Action..."
            className="ml-auto col-6"
        />
        <Card style={{marginTop: 10}}>
            <CardBody>
                <MDBDataTable
                    responsive
                    bordered
                    data={data}
                />
            </CardBody>
        </Card>
    </>
}