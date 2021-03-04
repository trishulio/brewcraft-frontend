import React, { useEffect, Fragment, useState, useCallback } from "react";
import { get, map } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { saveIngredient, fetchIngredients, fetchMaterialCategories, setBreadcrumbItems, fetchCategories, saveCategory } from "../../store/actions";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button
} from "reactstrap";
import { Modal } from "../../component/Common/Modal";
import RawMaterials from "./components/materials-table";
import MaterialCategoryDialog from "./components/material-category-dialog";
import RawFilter from "./components/material-filter";
import MaterialDialog from "./components/material-dialog";
import { INGREDIENTS } from "../../helpers/constants";

export default function   Facilities(props) {
  const [isNewMaterialCategoryOpen, setIsNewMaterialCategoryOpen] = useState(false);
  const [isNewMaterialOpen, setIsNewMaterialOpen] = useState(false);
  const dispatch = useDispatch();
  const { data, error, loading, formLoading } = useSelector(
    (state) => {
      return state.Materials.Ingredients
    }
  );
  const categories = useSelector(
    (state) => {
      return state.Materials.MaterialCategories
    }
  );
  const nullParentCategories = useSelector(
    (state) => {
      return state.Materials.Categories
    }
  );
  const MaterialModel = {
    locationType: 'work',
    name: 'Availity',
    checkItOut: true,
  };


  const TypeOption = useCallback((categories) => {
    return categories.length ? map(categories.sort((a, b) => {
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
      return 0;
    }), (dataType) => {
      return <option value={dataType.id} key={dataType.id} >{dataType.name}</option>
    }) : []
  }, [categories])

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
      fetchMaterialCategories(INGREDIENTS)
    );
    dispatch(
      fetchCategories()
    );
  }, []);
  console.log(categories)
  if (error) {
    return <div>error</div>;
  }
  if (categories.loading) { return null; }
  if (!data) {
    return null;
  }

  const newMaterialOpen = () => {
    setIsNewMaterialOpen(true)
  }

  const newMaterialClose = () => {
    setIsNewMaterialOpen(false)
  }
  const newMaterialCategoryOpen = () => {

    newMaterialClose()
    setIsNewMaterialCategoryOpen(true)
  }
  const newMaterialCategoryClose = () => {
    setIsNewMaterialCategoryOpen(false)
  }
  const newMaterialSubmit = (e, values) => {
    const {
      materialName,
      materialCategoryId,
      materialBaseQuantityUnit,
      materialDescription
    } = values
    const res = dispatch(saveIngredient({
      name: materialName,
      categoryId: materialCategoryId,
      baseQuantityUnit: materialBaseQuantityUnit,
      description: materialDescription,
      upc: ""
    }))

    newMaterialClose()
  }
  const newMaterialCategorySubmit = (e, values) => {
    const { categoryName, materialCategory } = values
    dispatch(saveCategory({ name: categoryName, parentCategoryId: materialCategory }))

    newMaterialCategoryClose()
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
        <Col md="12">
          <Card>
            <CardBody>
              <RawMaterials data={data} />
            </CardBody>
          </Card>
        </Col>
      </Row>
      {!!isNewMaterialOpen && (
        <Modal
          show={isNewMaterialOpen}
          handlerClose={newMaterialClose}
          title="New Ingredient"
        >
          <MaterialDialog to={props.match.url} categoryModelOpen={newMaterialCategoryOpen} submitFn={newMaterialSubmit} close={newMaterialClose} model={MaterialModel} optionsList={TypeOption(categories.data.filter(item=>item.parentCategoryId===INGREDIENTS))} />
        </Modal>
      )}
      {!!isNewMaterialCategoryOpen && (
        <Modal
          show={isNewMaterialCategoryOpen}
          handlerClose={newMaterialCategoryClose}
          title="New Material Category"
        >
          <MaterialCategoryDialog submitFn={newMaterialCategorySubmit} close={newMaterialCategoryClose} model={MaterialModel} optionsList={TypeOption(nullParentCategories.data)} />
        </Modal>
      )}
    </Fragment>


  );
}
