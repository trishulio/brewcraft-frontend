import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {deleteSupplierWatcher} from "../../../store/Suppliers/actions";
import {Col, FormGroup, Label, Row} from "reactstrap";
import Select from "react-select";
import {ModalAction} from "./modalAction";

export const DeleteModal = ({vendors}) => {
  const [vendorId, setVendorId] = useState(0);
  const dispatch = useDispatch();
  const handleVendorChange = e => {
    setVendorId(e.value);
  }

  const handleDelete = () => {
    dispatch(deleteSupplierWatcher(vendorId));
  }

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
      <ModalAction onSubmit={handleDelete}/>
    </Col>
  </Row>;
}
