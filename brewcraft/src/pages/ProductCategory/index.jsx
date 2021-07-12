import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, useLocation } from "react-router-dom";
import {
    setBreadcrumbItems,
    fetchProductCategoryById,
    createProductCategory,
    updateProductCategory,
    deleteProductCategory,
    fetchAllProductCategories,
    setProductCategoryDetails,
    setInvalidName,
    setInvalidClass,
    setInvalidType,
    resetProductCategoryDetails
} from "../../store/actions";
import ProductCategoryInner from "./category";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function ProductCategory() {
    const [editable, setEditable] = useState(false);
    const [initialProductCategory, setInitialProductCategory] = useState(null);
    const [changed, setChanged] = useState(false);

    const { id } = useParams();
    const query = useQuery();
    const editMode = query.get("edit");
    const history = useHistory();

    const dispatch = useDispatch();

    const category = useSelector(state => {
        return state.ProductCategory.data;
    });
    const { invalidName, invalidClass, invalidType } = useSelector(state => {
        return state.ProductCategory
    });

    useEffect(() => {
        if (!id || id === "new") {
            history.replace("/products/new?edit=true");
            dispatch(resetProductCategoryDetails({
                success: () => {
                    setEditMode(true);
                }
            }));
            dispatch(setBreadcrumbItems("New Product Category", [
                { title: "Main", link: "#" },
                { title: "Products", link: "#" },
                { title: "Product Categories", link: "#" }]
            ));
        } else {
            dispatch(fetchProductCategoryById({
                id: id,
                success: category => {
                    dispatch(setBreadcrumbItems(category.name, [
                        { title: "Main", link: "#" },
                        { title: "Products", link: "#" },
                        { title: "Product Categories", link: "#" }]
                    ));
                    setInitialProductCategory(category);
                    setChanged(false);
                }
            }));
        }

        dispatch(fetchAllProductCategories());

    }, [id]);

    useEffect(() => {
        setChanged(false);
        setEditMode(editMode && editMode !== "false");
    }, [editMode]);

    useEffect(() => {
        setChanged(isChanged());
    }, [category]);

    function setEditMode(editable) {
        if (editable) {
            setInitialProductCategory({
                ...category
            });
        }
        setEditable(editable);
    }

    function isChanged() {
        return initialProductCategory
            && JSON.stringify(
                (({ id, name, parentCategoryId }) => ({ id, name, parentCategoryId }))(initialProductCategory))
            !== JSON.stringify(
                (({ id, name, parentCategoryId }) => ({ id, name, parentCategoryId }))(category))
    }

    function onChange(e) {
        dispatch(
            setProductCategoryDetails({
                [e.target.name]: e.target.value
            })
        );
    }

    function onCancel() {
        _clear();
        setEditMode(false);
    }

    function _clear() {
        dispatch(setProductCategoryDetails(initialProductCategory));
        dispatch(setInvalidName(false));
        dispatch(setInvalidClass(false));
        dispatch(setInvalidType(false));
        setChanged(false);
    }

    function getCategoryId() {
        if (category.style) {
            return category.style.id;
        }
        if (category.type) {
            return category.type.id;
        }
        if (category.class) {
            return category.class.id;
        }
        return null;
    }

    function onSave() {
        if (invalidName || invalidClass || invalidType) {
            return;
        }
        if (!isChanged()) {
            setEditMode(false);

        } else if (category.id) {
            dispatch(
                updateProductCategory({
                    data: category,
                    parentCategoryId: category.parentCategoryId,
                    success: () => {
                        history.push(`/products/categories/${category.id}`);
                    }
                })
            );
        } else {
            dispatch(
                createProductCategory({
                    data: category,
                    categoryId: category.parentCategoryId,
                    success: category => {
                        history.push(`/products/categories/${category.id}`);
                    }
                })
            );
        }
    }

    function onEdit() {
        history.push({
            pathname: `/products/categories/${id}`,
            search: "?edit=true"
        });
    }

    function onDelete() {
        if (category.id) {
            dispatch(deleteProductCategory({
                id: category.id,
                success: () => {
                    dispatch(resetProductCategoryDetails({
                        success: () => {
                            history.push("/products/categories");
                        }
                    }));
                }
            }));
        }
    }

    return (
        <ProductCategoryInner {...{category, editable, changed, onChange, onCancel, onSave, onEdit, onDelete}} />
    );
}