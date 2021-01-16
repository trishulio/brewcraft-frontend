import React, { useEffect, Fragment, useState, useCallback } from "react";
import { get, map, pick, reduce, set } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import { Modalcall } from "../../component/Common/Modalcall";
import RawMaterials from "./components/raw-materials-table";
import {
  getFacilities,
  editFacilities,
  saveFacilities,
} from "../../store/Facilities/actions";

export default function Facilities() {
  const [isOpenNewRecord, setIsOpenNewRecord] = useState(false);
  const [isRecordWaste, setIsRecordWaste] = useState(false);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.Facilities);

  useEffect(() => {
    dispatch(
      setBreadcrumbItems("Raw Materials", [
        { title: "Materials", link: "/materials" },
        { title: "Raw Materials", link: "#" },
      ])
    );
    dispatch(getFacilities());
  }, []);
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

  const dialogCloseFnNewRecord = () => {
    setIsOpenNewRecord(false);
  };
  const dialogOpenFnNewRecord = () => {
    setIsOpenNewRecord(true);
  };

  return (
    <Fragment>
      <Row>
        <Col xs="12">
          <div className="float-right mb-3">
            <Button color="link" onClick={dialogOpenFnNewRecord}>
              New Material
            </Button>
            <Button color="link" onClick={dialogOpenFnNewRecord}>
              Record Waste
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs="3">
          <Card>
            <CardBody>Filter</CardBody>
          </Card>
        </Col>
        <Col xs="9">
          <Card>
            <CardBody>
              <RawMaterials facilities={data} editFn={dialogCloseFnNewRecord} />
            </CardBody>
          </Card>
        </Col>
      </Row>
      {!!isOpenNewRecord && (
        <Modalcall
          show={isOpenNewRecord}
          handlerClose={dialogCloseFnNewRecord}
          title="Add Company"
        >
          {/* <EquipmentForm /> */}
        </Modalcall>
      )}
      {!!isRecordWaste && (
        <Modalcall
          show={isRecordWaste}
          handlerClose={dialogCloseFnNewRecord}
          title="Add Company"
        >
          {/* <EquipmentForm /> */}
        </Modalcall>
      )}
    </Fragment>
  );
}
