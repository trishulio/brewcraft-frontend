import React, { useEffect, Fragment, useState, useCallback } from "react";
import { get, map } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { savePackagingMaterial,fetchPackagingMaterial,fetchMaterialCategories } from "../../store/actions";
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
    (state) => state.Materials.PackagingMaterial
  );
  const categories = useSelector(
    (state) => {
      return state.Materials.MaterialCategories
    }
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
    return categories.data.length ? map(categories.data.sort((a,b)=>{
      if(a.name < b.name) { return -1; }
      if(a.name > b.name) { return 1; }
      return 0;
    }), (dataType)=>{
      return <option value={dataType.id} key={dataType.id} >{dataType.name}</option>
    }): []
},[categories])
  useEffect(() => {
    dispatch(
      fetchPackagingMaterial()
    );
    dispatch(
      fetchMaterialCategories()
    );
  }, []);

  if (error) {
    return <div>Error</div>;
  }

  if (!data) {
    return null;
  }
  if (categories.loading)
  {return null;}
  const filterSubmit = (e) =>{
    console.log(filterModel);
  }

  const newMaterialOpen = () =>{
    setIsNewMaterialOpen(true)
  }

  const newMaterialClose = () =>{
    setIsNewMaterialOpen(false)
  }

  const newMaterialSubmit = (e,values) =>{
    const {materialName,materialCategory}=values
    dispatch(savePackagingMaterial({name : materialName}))
    
    newMaterialClose()
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
              <MaterialsTable data={data} categories={categories}  />
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
