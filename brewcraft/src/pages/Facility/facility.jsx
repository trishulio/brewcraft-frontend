import React, { useEffect, Fragment, useState, useCallback } from "react";
import { get, map, omit, isArray } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import { Modal } from "../../component/Common/Modal";
import FacilityTable from "./facility-table";
import FacilityForm from "./facility-form";
import { fetchFacilities, createFacility } from "../../store/Equipment/actions";

export default function Facility() {

  const [isOpen, setIsOpen] = useState(false);
  const [editForm, setEditForm] = useState({ edit: false, formData: null });
  const dispatch = useDispatch();

  const { facilities:data } = useSelector((state) => state.Equipment);

  useEffect(() => {
    dispatch(
      setBreadcrumbItems("Facility", [
        { title: "Dashboard", link: "/dashboard" },
      ])
    );
    data && dispatch(fetchFacilities());
  }, []);

  const FormModal = {
    name: "",
    address: {
      addressLine1: "",
      addressLine2: "",
      country: "",
      province: "",
      city: "",
      postalCode: "",
    },
    phoneNumber: "",
    faxNumber: "",
    equipment: [],
    storages: [],
  };

  const tableData = useCallback(()=> {
    return map(data, (currentList)=>{
      return omit({...currentList, ...currentList.address},['address','equipment','storages']);
    })
  },[data]);

  const dialogCloseFn = () => {
    setIsOpen(false);
  };
  const dialogOpenFn = () => {
    setIsOpen(true);
  };

  const createFacilities = (e, model) =>{
    const Model = {...FormModal,...model }
    dispatch(
      createFacility({
        formData:Model,
        success: () => {
          dialogCloseFn()
        }
      }));
  }

  return (
    <Fragment>
      <Row>
        <Col xs="12">
          <div className="float-right mb-3">
            <Button color="link" onClick={dialogOpenFn}>
              Add Facility
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <Card>
            <CardBody>
              <FacilityTable
                facilities={tableData()}
                editFn={dialogCloseFn}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      {!!isOpen && (
        <Modal
          show={isOpen}
          close={dialogCloseFn}
          title="Add Facility"
        >
          <FacilityForm  FormModal={FormModal}  close={dialogCloseFn} companySubmit={createFacilities} />
        </Modal>
      )}
    </Fragment>
  );
}
