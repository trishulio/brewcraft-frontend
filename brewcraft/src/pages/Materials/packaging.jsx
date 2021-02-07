import React, { useEffect, Fragment, useState, useCallback } from "react";
import { get, map } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button
} from "reactstrap";
import { Modalcall } from "../../component/Common/Modalcall";
import MaterialsTable from "./components/materials-table";
import MaterialsFilter from "./components/material-filter";
import MaterialDialog from "./components/material-dialog";

export default function Facilities() {
  const [isNewMaterialOpen, setIsNewMaterialOpen] = useState(false);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.Materials.RawMaterial
  );
  const MaterialModel = {
    locationType: 'work',
    name: 'Availity',
    checkItOut: true,
  };
  let filterModel = {
    MaterialName: '',
    MaterialType: '',
    hideItemsWithNoQuantity: true
  };
  const TypeOption = useCallback(()=>{
      return map(get(data,'types'), (dataType)=>{
        return <option value={dataType}>{dataType}</option>
      })
  },[get(data,'types')])

  useEffect(() => {
    dispatch(
      setBreadcrumbItems("Packaging", [
        { title: "Dashboard", link: "/dashboard" },
        { title: "Materials", link: "#" },
      ])
    );
  }, []);

  if (error) {
    return <div>Error</div>;
  }

  if (!data) {
    return null;
  }

  const filterSubmit = (e) =>{
    console.log(filterModel);
  }

  const newMaterialOpen = () =>{
    setIsNewMaterialOpen(true)
  }

  const newMaterialClose = () =>{
    setIsNewMaterialOpen(false)
  }

  const newMaterialSubmit = (e) =>{
    console.log(e);
  }

  return (
    <Fragment>
      <Row>
        <Col xs="12">
          <div className="float-right mb-3">
            <Button color="link" onClick={newMaterialOpen}>
              Add Packaging
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md="3">
          <Card>
            <CardBody>
              <MaterialsFilter submitFn={filterSubmit} model={filterModel} optionsList={TypeOption()} />
            </CardBody>
          </Card>
        </Col>
        <Col md="9">
          <Card>
            <CardBody>
              <MaterialsTable data={data}  />
            </CardBody>
          </Card>
        </Col>
      </Row>
      {!!isNewMaterialOpen && (
        <Modalcall
          show={isNewMaterialOpen}
          handlerClose={newMaterialClose}
          title="New Packaging"
        >
          <MaterialDialog submitFn={newMaterialSubmit} close={newMaterialClose} model={MaterialModel} optionsList={TypeOption()} />
        </Modalcall>
      )}
    </Fragment>
  );
}
