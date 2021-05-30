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
  editIngredient,
} from "../../store/actions";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import { Modal } from "../../component/Common/Modal";
import RawMaterials from "./components/materials-table";
import MaterialCategoryDialog from "./components/material-category-dialog";
import MaterialDialog from "./components/material-dialog";
import { INGREDIENTS } from "../../helpers/constants";
import { ToastContainer } from "react-toastify";
import Loading from "../../component/Common/Loading";
import BootstrapTable from "../../component/Tables/bootstrap-table";
import { ColToggle, TableSearch } from "../../component/Tables/col-toggle";
import { TableProvider } from "../../component/Tables/table-context";

export default function Facilities(props) {
  const [isNewMaterialCategoryOpen, setIsNewMaterialCategoryOpen] =
    useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const ingrediantsColumn = [
    {
      text: "Name",
      dataField: "name",
      sort: true,
    },
    {
      text: "Category",
      dataField: "category.name",
      sort: true,
    },
    {
      text: "Description",
      dataField: "description",
      sort: true,
    },
    {
      text: "Unit",
      dataField: "baseQuantityUnit",
      sort: true,
    },
    {
      text: "Available",
      dataField: "quantity",
      sort: true,
    },
    {
      field: "view",
    },
  ];
  const { data, error, loading, formLoading } = useSelector((state) => {
    return state.Materials.Ingredients;
  });
  const categories = useSelector((state) => {
    return state.Materials.AllCategories;
  });
  const nullParentCategories = useSelector((state) => {
    return state.Materials.Categories;
  });

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
    return <Loading />;
  }
  if (!data) {
    return null;
  }

  const newMaterialOpen = () => {
    setIsOpen(true);
  };

  const newMaterialClose = () => {
    setIsOpen(false);
  };
  const newMaterialCategoryOpen = () => {
    setIsNewMaterialCategoryOpen(true);
  };
  const newMaterialCategoryClose = () => {
    setIsNewMaterialCategoryOpen(false);
  };
  const newMaterialSubmit = (e, values) => {
    const {
      materialName,
      materialCategoryId,
      materialBaseQuantityUnit,
      materialDescription,
    } = values;
    const res = dispatch(
      saveIngredient({
        name: materialName,
        categoryId: materialCategoryId,
        baseQuantityUnit: materialBaseQuantityUnit,
        description: materialDescription,
        upc: "",
      })
    );

    newMaterialClose();
  };
  const newMaterialCategorySubmit = (e, values) => {
    const { categoryName, materialCategory } = values;
    dispatch(
      saveCategory({ name: categoryName, parentCategoryId: materialCategory })
    );

    newMaterialCategoryClose();
  };
  const Table_props = {
    newMaterialOpen,
    tableName: "Ingredients Table",
    column: ingrediantsColumn,
    // data
    data: [
      {
        id: 1,
        name: "Chocolate Malt",
        description: "",
        materialClass: {
          id: 1,
          parentCategoryId: null,
          name: "Ingredient",
          version: 0,
        },
        category: { id: 4, parentCategoryId: 1, name: "Hop", version: 0 },
        upc: "",
        baseQuantityUnit: "kg",
        version: 0,
      },
      {
        id: 2,
        name: "Chocolate Malt",
        description: "",
        materialClass: {
          id: 1,
          parentCategoryId: null,
          name: "Ingredient",
          version: 0,
        },
        category: { id: 4, parentCategoryId: 1, name: "Hop", version: 0 },
        upc: "",
        baseQuantityUnit: "kg",
        version: 0,
      },
      {
        id: 3,
        name: "Chocolate Malt",
        description: "",
        materialClass: {
          id: 1,
          parentCategoryId: null,
          name: "Ingredient",
          version: 0,
        },
        category: { id: 4, parentCategoryId: 1, name: "Hop", version: 0 },
        upc: "",
        baseQuantityUnit: "kg",
        version: 0,
      },
      {
        id: 4,
        name: "Chocolate Malt",
        description: "",
        materialClass: {
          id: 1,
          parentCategoryId: null,
          name: "Ingredient",
          version: 0,
        },
        category: { id: 4, parentCategoryId: 1, name: "Hop", version: 0 },
        upc: "",
        baseQuantityUnit: "kg",
        version: 0,
      },
      {
        id: 5,
        name: "Chocolate Malt",
        description: "",
        materialClass: {
          id: 1,
          parentCategoryId: null,
          name: "Ingredient",
          version: 0,
        },
        category: { id: 4, parentCategoryId: 1, name: "Hop", version: 0 },
        upc: "",
        baseQuantityUnit: "kg",
        version: 0,
      },
      {
        id: 6,
        name: "Chocolate Malt",
        description: "",
        materialClass: {
          id: 1,
          parentCategoryId: null,
          name: "Ingredient",
          version: 0,
        },
        category: { id: 4, parentCategoryId: 1, name: "Hop", version: 0 },
        upc: "",
        baseQuantityUnit: "kg",
        version: 0,
      },
      {
        id: 7,
        name: "Chocolate Malt",
        description: "",
        materialClass: {
          id: 1,
          parentCategoryId: null,
          name: "Ingredient",
          version: 0,
        },
        category: { id: 4, parentCategoryId: 1, name: "Hop", version: 0 },
        upc: "",
        baseQuantityUnit: "kg",
        version: 0,
      },
      {
        id: 8,
        name: "Chocolate Malt",
        description: "",
        materialClass: {
          id: 1,
          parentCategoryId: null,
          name: "Ingredient",
          version: 0,
        },
        category: { id: 4, parentCategoryId: 1, name: "Hop", version: 0 },
        upc: "",
        baseQuantityUnit: "kg",
        version: 0,
      },
      {
        id: 9,
        name: "Chocolate Malt",
        description: "",
        materialClass: {
          id: 1,
          parentCategoryId: null,
          name: "Ingredient",
          version: 0,
        },
        category: { id: 4, parentCategoryId: 1, name: "Hop", version: 0 },
        upc: "",
        baseQuantityUnit: "kg",
        version: 0,
      },
      {
        id: 10,
        name: "Chocolate Malt",
        description: "",
        materialClass: {
          id: 1,
          parentCategoryId: null,
          name: "Ingredient",
          version: 0,
        },
        category: { id: 4, parentCategoryId: 1, name: "Hop", version: 0 },
        upc: "",
        baseQuantityUnit: "kg",
        version: 0,
      },
      {
        id: 11,
        name: "Chocolate Malt",
        description: "",
        materialClass: {
          id: 1,
          parentCategoryId: null,
          name: "Ingredient",
          version: 0,
        },
        category: { id: 4, parentCategoryId: 1, name: "Hop", version: 0 },
        upc: "",
        baseQuantityUnit: "kg",
        version: 0,
      },
    ],
  };

  return (
    <Fragment>
      <TableProvider value={Table_props}>
        <BootstrapTable
        // column={ingrediantsColumn}
        // data={[]}
        // tableName="Ingredient"
        // searchProp={setSearchProps}
        // editOnClick={dialogOpenEditFn}
        // deletOnClick={dialogOpenDeleteFn}
        />
      </TableProvider>
      {!!isOpen && (
        <Modal show={isOpen} close={newMaterialClose} title="New Ingredient">
          <MaterialDialog
            to={props.match.url}
            categoryModelOpen={newMaterialCategoryOpen}
            submitFn={newMaterialSubmit}
            close={newMaterialClose}
            model={MaterialModel}
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
