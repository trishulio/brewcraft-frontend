import React, { useEffect, Fragment, useState, useCallback } from "react";
import { get, map } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  savePackagingMaterial,
  fetchPackagingMaterial,
  fetchAllCategories,
  setBreadcrumbItems,
  fetchCategories,
  saveCategory,
  fetchMaterialById
} from "../../store/actions";
import Loading from "../../component/Common/loading";
import PackagingInner from "./packaging";

export default function Packaging() {
  const [isNewMaterialCategoryOpen, setIsNewMaterialCategoryOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [packaging, setPackaging] = useState(null);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.Materials.PackagingMaterial
  );
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
      setBreadcrumbItems("Packaging", [
        { title: "Main", link: "#" },
        { title: "Raw Materials", link: "#" },
      ])
    );
    dispatch(fetchPackagingMaterial());
    dispatch(fetchAllCategories());
    dispatch(fetchCategories());
  }, []);
  if (error) {
    return <div>Error</div>;
  }

  if (!data) {
    return null;
  }
  if (categories.loading) {
    return <Loading />;
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


      dispatch(
        savePackagingMaterial({
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
  const editPackagingAction = (id) => {
    dispatch(
      fetchMaterialById({
        id: id,
        success: (data) => {
          setPackaging({
            ...data,
            materialCategoryId: data.category.id,
            materialName: data.name,
            materialDescription: data.description,
            materialBaseQuantityUnit: data.baseQuantityUnit,
          });

          setIsOpen(true);
        },
      })
    );
  };
  return (
      <PackagingInner />
  );
}
