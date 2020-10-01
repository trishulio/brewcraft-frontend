import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {Col, FormGroup, Input, Label, Row} from "reactstrap";
import {ModalAction} from "./modalAction";
import {startCreateSupplierWatcher} from "../../../store/Suppliers/actions";

export const CreateModal = () => {
  const [fields, setFields] = useState({});
  const dispatch = useDispatch();

  const handleInputChange = e => {
    setFields(({...fields, [e.target.name]: e.target.value}))
  }

  const handleCreate = () => {
    dispatch(startCreateSupplierWatcher(fields));
  };

  return <Row>
    <Col xs="12">
      <h4 className="card-title">Create Vendor</h4>
      <FormGroup row>
        <Label
          for="name"
          className="col-sm-12 col-form-label">Name</Label>
        <Input className="form-control"
               onChange={handleInputChange}
               name="name"
               type="text" id="name"/>
      </FormGroup>
      <FormGroup row>
        <Label
          for="email"
          className="col-sm-12 col-form-label">Email</Label>
        <Input className="form-control"
               onChange={handleInputChange}
               name="email"
               type="text" id="email"/>
      </FormGroup>
      <FormGroup row>
        <Label
          for="directDeposit"
          className="col-sm-12 col-form-label">Direct Deposit</Label>
        <Input className="form-control"
               onChange={handleInputChange}
               name="directDeposit"
               type="text" id="directDeposit"/>
      </FormGroup>
      <FormGroup row>
        <Label
          for="actions"
          className="col-sm-12 col-form-label">Actions</Label>
        <Input className="form-control"
               name="actions"
               onChange={handleInputChange}
               type="text" id="actions"/>
      </FormGroup>
      <ModalAction onSubmit={handleCreate}/>
    </Col>
  </Row>;
}
