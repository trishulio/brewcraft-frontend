import React, { useEffect, Fragment, useState, useCallback } from "react";
import { get, map } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  saveIngredient,
  fetchIngredients,
  deleteIngredient,
  setBreadcrumbItems,
  fetchCategories,
  saveCategory,
  fetchAllCategories,
  fetchMaterialById,
  editIngredient
} from "../../store/actions";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import { Modal } from "../../component/Common/Modal";
import RawMaterials from "./components/materials-table";
import MaterialCategoryDialog from "./components/material-category-dialog";
import MaterialDialog from "./components/material-dialog";
import { INGREDIENTS } from "../../helpers/constants";
import { ToastContainer } from "react-toastify";
export default function Facilities(props) {
  const [isNewMaterialCategoryOpen, setIsNewMaterialCategoryOpen] = useState(
    false
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const { data, error, loading, formLoading } = useSelector((state) => {
    return state.Materials.Ingredients;
  });
  const categories = useSelector((state) => {
    return state.Materials.AllCategories;
  });
  const nullParentCategories = useSelector((state) => {
    return state.Materials.Categories;
  });
  const [ingredient, setIngredient] = useState(null);
  const MaterialModel = {
    locationType: "work",
    name: "Availity",
    checkItOut: true,
  };

  const TypeOption = useCallback(
    (categories) => {
      return categories.length
        ? map(
            categories.sort((a, b) => {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            }),
            (dataType) => {
              return (
                <option value={dataType.id} key={dataType.id}>
                  {dataType.name}
                </option>
              );
            }
          )
        : [];
    },
    [categories]
  );

  useEffect(() => {
    dispatch(
      setBreadcrumbItems("Ingredients", [
        { title: "Main", link: "#" },
        { title: "Raw Materials", link: "#" },
      ])
    );
    dispatch(fetchIngredients());
    dispatch(fetchAllCategories());
    dispatch(fetchCategories());
  }, []);
  if (error) {
    return <div>error</div>;
  }
  if (categories.loading) {
    return null;
  }
  if (!data) {
    return null;
  }

  const newMaterialOpen = () => {
    setIsOpen(true);
  };

  const newMaterialClose = () => {
    setIsOpen(false);
    setEdit(false);
  };
  const newMaterialCategoryOpen = () => {
    setIsNewMaterialCategoryOpen(true);
  };
  const newMaterialCategoryClose = () => {
    setIsNewMaterialCategoryOpen(false);
    setEdit(false);
  };
  const newMaterialSubmit = (e, values) => {
    const {
      materialName,
      materialCategoryId,
      materialBaseQuantityUnit,
      materialDescription,
    } = values;
    if(isEdit)
    {

      const res = dispatch(
        editIngredient({
          id : ingredient.id,
          form : {
            name: materialName,
            categoryId: materialCategoryId,
            baseQuantityUnit: materialBaseQuantityUnit,
            description: materialDescription,
            upc: "",
          }
        })
      );
      setEdit(false);
    }
    else{

      const res = dispatch(
        saveIngredient({
          name: materialName,
          categoryId: materialCategoryId,
          baseQuantityUnit: materialBaseQuantityUnit,
          description: materialDescription,
          upc: "",
        })
      );
    }

    newMaterialClose();
  };
  const newMaterialCategorySubmit = (e, values) => {
    const { categoryName, materialCategory } = values;
    dispatch(
      saveCategory({ name: categoryName, parentCategoryId: materialCategory })
    );

    newMaterialCategoryClose();
  };
  const editIngredientAction = (id) => {
    dispatch(
      fetchMaterialById({
        id: id,
        success: (data) => {
          setIngredient({
            ...data,
            materialCategoryId: data.category.id,
            materialName: data.name,
            materialDescription: data.description,
            materialBaseQuantityUnit: data.baseQuantityUnit
          });
          setEdit(true);
          setIsOpen(true);
        },
      })
    );
  };
  const deleteIngredientAction = (id) => {
    dispatch(deleteIngredient({ id }));
  };
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
              <RawMaterials
                editFn={editIngredientAction}
                deleteFn={deleteIngredientAction}
                data={data}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      {!!isOpen && (
        <Modal show={isOpen} close={newMaterialClose} title="New Ingredient">
          <MaterialDialog
            to={props.match.url}
            categoryModelOpen={newMaterialCategoryOpen}
            submitFn={newMaterialSubmit}
            close={newMaterialClose}
            model={isEdit ? ingredient : MaterialModel}
            optionsList={TypeOption(
              categories.data.filter(
                (item) => item.parentCategoryId === INGREDIENTS
              )
            )}
          />
        </Modal>
      )}
      {!!isNewMaterialCategoryOpen && (
        <Modal
          show={isNewMaterialCategoryOpen}
          close={newMaterialCategoryClose}
          title="New Material Category"
        >
          <MaterialCategoryDialog
            submitFn={newMaterialCategorySubmit}
            close={newMaterialCategoryClose}
            model={MaterialModel}
            optionsList={TypeOption(nullParentCategories.data)}
          />
        </Modal>
      )}
      <ToastContainer />
    </Fragment>
  );
}
