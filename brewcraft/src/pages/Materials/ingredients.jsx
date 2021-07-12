import React, { useEffect, Fragment, useState, useCallback, useMemo } from "react";
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
import { Modal } from "../../component/Common/modal";
import RawMaterials from "./components/materials-table";
import MaterialCategoryDialog from "./components/material-category-dialog";
import MaterialDialog from "./components/material-dialog";
import { INGREDIENTS } from "../../helpers/constants";
import { ToastContainer } from "react-toastify";
import Loading from "../../component/Common/loading";
import BootstrapTable from "../../component/Tables/bootstrap-table";
import { ColToggle, TableSearch } from "../../component/Tables/col-toggle";
import { TableProvider } from "../../component/Tables/table-context";
import { useHistory } from "react-router-dom";

export default function Facilities(props) {
  const [isNewMaterialCategoryOpen, setIsNewMaterialCategoryOpen] =
    useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  const history = useHistory();
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
  const openTableData = (row) => {
    const category = row.category.name;
    history.push(`/materials/${row.id}/${category}`);
  };
  const ButtonFormatter = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div className="text-center">
        <Button size="sm" onClick={() => openTableData(row)}>
          Open
        </Button>
      </div>
    );
  };
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
      dataField: "view",
      text: "view",
      headerAlign: "center",
      formatter: ButtonFormatter,
    },
  ];
  const Table_props = useMemo(
    () => ({
      column: ingrediantsColumn,
      data,
      headerComponent: (
        <Button color="primary mr-4" onClick={newMaterialOpen}>
          Add Ingredient
        </Button>
      ),
    }),
    [data]
  );
  if (error) {
    return <div>error</div>;
  }
  if (categories.loading) {
    return <Loading />;
  }
  if (!data) {
    return null;
  }

  return (
    <Fragment>
      <TableProvider value={Table_props}>
        <BootstrapTable />
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
