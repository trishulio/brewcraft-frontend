import React, {useMemo, useState} from "react";
import {useDispatch} from "react-redux";
import {updateSupplier} from "../../../store/suppliers/suppliers-actions";
import {Col, FormGroup, Input, Label, Row} from "reactstrap";
import Select from "react-select";
import {ModalActionContainer} from "./ModalAction";

export const UpdateModalContainer = ({ vendors }) => {
  const [fields, setFields] = useState({});
  const dispatch = useDispatch();

  const handleInputChange = e => {
    setFields(({ ...fields, [e.target.name]: e.target.value }))
  }

  const handleUpdate = () => {
    dispatch(updateSupplier(fields));
  }

  const handleSelectChange = e => {
    setFields(e);
  }

  const disabled = useMemo(() => !fields, [fields]);

  return <Row>
    <Col xs="12">
      <h4 className="card-title">Update Vendor</h4>
      <FormGroup row>
        <Label for="vendor"
               className="col-sm-12 col-form-label">Please Select Vendor</Label>
        <Col sm="12">
          <Select onChange={handleSelectChange} name="vendor" options={vendors} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label
          for="name"
          className="col-sm-12 col-form-label">Name</Label>
        <Input className="form-control"
               onChange={handleInputChange}
               name="name"
               defaultValue={fields.name}
               disabled={disabled}
               type="text" id="name" />
      </FormGroup>
      <FormGroup row>
        <Label
          for="email"
          className="col-sm-12 col-form-label">Email</Label>
        <Input className="form-control"
               onChange={handleInputChange}
               name="email"
               defaultValue={fields.email}
               disabled={disabled}
               type="text" id="email" />
      </FormGroup>
      <FormGroup row>
        <Label
          for="directDeposit"
          className="col-sm-12 col-form-label">Direct Deposit</Label>
        <Input className="form-control"
               onChange={handleInputChange}
               disabled={disabled}
               defaultValue={fields.directDeposit}
               name="directDeposit"
               type="text" id="directDeposit" />
      </FormGroup>
      <FormGroup row>
        <Label
          for="actions"
          className="col-sm-12 col-form-label">Actions</Label>
        <Input className="form-control"
               name="actions"
               disabled={disabled}
               defaultValue={fields.actions}
               onChange={handleInputChange}
               type="text" id="actions" />
      </FormGroup>
      <ModalActionContainer onSubmit={handleUpdate} />;
    </Col>
  </Row>;
}
