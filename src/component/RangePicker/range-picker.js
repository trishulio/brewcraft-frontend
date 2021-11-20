import React from 'react';
import {
    Form,
    FormGroup,
    InputGroup,
  } from "reactstrap";
import DatePicker from "react-datepicker";

export function RangePicker(props) {
    return (
        <Form inline>
        <FormGroup className="mr-3">
        <InputGroup>
            <DatePicker
                className="form-control"
                selected={props.startDate}
                // onChange={this.handleDefault}
            />
        </InputGroup>
        </FormGroup>
        <FormGroup>
        <InputGroup>
            <DatePicker
                className="form-control"
                selected={props.endDate}
                // onChange={this.handleDefault}
            />
        </InputGroup>
        </FormGroup>
        </Form>
    );
}