import React, { useEffect, Fragment, useState, useCallback } from "react";
import { get, map, pick, reduce, set } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import { Modalcall } from "../../component/Common/Modalcall";
import FacilityTable from "./facility-table";
import FacilityForm from "./facility-form";
import { getFacilities } from "../../store/Equipment/actions";
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
    dispatch(getFacilities());
  }, []);
  const FormModal = {
    name: "dsfadf",
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
  // if (loading) {
  //   return <div>Loading...</div>;
  // }
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
    console.log(Model);

    
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
                facilities={get(data, "content", [])}
                editFn={dialogCloseFn}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      {!!isOpen && (
        <Modalcall
          show={isOpen}
          handlerClose={dialogCloseFn}
          title="Add Company"
        >
          <FacilityForm  FormModal={FormModal}  close={dialogCloseFn} companySubmit={createFacilities} />
        </Modalcall>
      )}
    </Fragment>
  );
}
