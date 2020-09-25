import React from 'react';
import { MDBDataTable } from 'mdbreact';
import Select from 'react-select'
import styles from './Suppliers.module.css';
import { Card, CardBody } from 'reactstrap';

export const SuppliersUI = ({data, actions = [], handleSelectChange}) => {
    return <>
        <Select
            options={actions}
            onChange={handleSelectChange}
            placeholder="Select Action..."
            className={styles.Select}
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