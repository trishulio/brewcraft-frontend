import React, { useEffect, Fragment, useState, useCallback } from "react";
import { get, map, omit, isArray } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import { Modal } from "../../component/Common/Modal";
import FacilityTable from "./facility-table";
import FacilityForm from "./facility-form";
import { getFacilities, saveFacilities} from "../../store/Equipment/actions";
export default function Facility() {
  const [isOpen, setIsOpen] = useState(false);
  const [editForm, setEditForm] = useState({ edit: false, formData: null });
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.Equipments);

  useEffect(() => {
    dispatch(
      setBreadcrumbItems("Facility", [
        { title: "Dashboard", link: "/dashboard" },
      ])
    );
    isArray(data) && dispatch(getFacilities());
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
  const tableData = useCallback(()=>{
    return map(get(data, "content", []), (currentList)=>{
      return omit({...currentList, ...currentList.address},['address','equipment','storages']);
    })
  },[data]);

  if (loading) {
    return <div>Loading...</div>;
  }
  // somthing wrong first time
  if (error) {
    return <div>Error</div>;
  }
  // unconditional error occur
  if (!data) {
    return null;
  }

  const dialogCloseFn = () => {
    setIsOpen(false);
  };
  const dialogOpenFn = () => {
    setIsOpen(true);
  };

  const createFacilities = (e, model) =>{
    const Model = {...FormModal,...model }
    dispatch(saveFacilities({form:Model, successFn:dialogCloseFn}))
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
          title="Add Facilitie"
        >
          <FacilityForm  FormModal={FormModal}  close={dialogCloseFn} companySubmit={createFacilities} />
        </Modal>
      )}
    </Fragment>
  );
}
