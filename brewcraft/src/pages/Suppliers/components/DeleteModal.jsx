import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {deleteSupplier} from "../../../store/suppliers/suppliers-actions";
import {Col, FormGroup, Label, Row} from "reactstrap";
import Select from "react-select";
import {ModalActionContainer} from "./ModalAction";

export const DeleteModalContainer = ({vendors}) => {
  const [vendorId, setVendorId] = useState(0);
  const dispatch = useDispatch();
  const handleVendorChange = e => {
    setVendorId(e.value);
  }

  const handleDelete = () => {
    dispatch(deleteSupplier(vendorId));
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
      <ModalActionContainer onSubmit={handleDelete}/>
    </Col>
  </Row>;
}
