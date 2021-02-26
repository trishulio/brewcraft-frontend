import React, { useEffect, Fragment, useState, useCallback } from "react";
import { get, map } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { saveIngredient , fetchIngredients ,fetchMaterialCategories,setBreadcrumbItems} from "../../store/actions";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button
} from "reactstrap";
import { Modalcall } from "../../component/Common/Modalcall";
import RawMaterials from "./components/materials-table";
import RawFilter from "./components/material-filter";
import MaterialDialog from "./components/material-dialog";

export default function Facilities() {
  const [isNewMaterialOpen, setIsNewMaterialOpen] = useState(false);
  const dispatch = useDispatch();
  const {data , error ,loading,formLoading} = useSelector(
    (state) => {
      return state.Materials.Ingredients
    }
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
      setBreadcrumbItems("Ingredients", [
        { title: "Dashboard", link: "/dashboard" },
        { title: "Materials", link: "#" },
      ])
    );
    dispatch(
      fetchIngredients()
    );
    dispatch(
      fetchMaterialCategories()
    );
  }, []);

  if (error) {
    return <div>error</div>;
  }
  if (categories.loading)
  {return null;}
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

  const newMaterialSubmit = (e,values) =>{
    const {materialName,materialCategory}=values
    const res=dispatch(saveIngredient({name : materialName}))
    
    newMaterialClose()
  }
  return (
      <Fragment>
      <Row>
        <Col xs="12">
          <div className="float-right mb-3">
            <Button color="link" onClick={newMaterialOpen}>
              Add Ingredient
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md="3">
          <Card>
            <CardBody>
              <RawFilter submitFn={filterSubmit} model={filterModel} optionsList={TypeOption()} />
            </CardBody>
          </Card>
        </Col>
        <Col md="9">
          <Card>
            <CardBody>
              <RawMaterials data={data} categories={categories}  />
            </CardBody>
          </Card>
        </Col>
      </Row>
      {!!isNewMaterialOpen && (
        <Modalcall
          show={isNewMaterialOpen}
          handlerClose={newMaterialClose}
          title="New Ingredient"
        >
          <MaterialDialog submitFn={newMaterialSubmit} close={newMaterialClose} model={MaterialModel} optionsList={TypeOption(categories)} />
        </Modalcall>
      )}
    </Fragment>
    
   
  );
}
