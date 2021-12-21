import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
    setBreadcrumbItems,
    fetchProductCategoryById,
    createProductCategory,
    updateProductCategory,
    deleteProductCategory,
    fetchAllProductCategories,
    setProductCategoryDetails,
} from "../../store/actions";
import { useQuery } from "../../helpers/utils";
import ProductCategoryInner from "./category";
import DeleteGuard from "../../component/Prompt/DeleteGuard";
import RouteLeavingGuard from "../../component/Prompt/RouteLeavingGuard";
import { setProductCategoryInvalidName } from "../../store/ProductCategory/actions";

export default function ProductCategory() {
    const [editable, setEditable] = useState(false);
    const [changed, setChanged] = useState(false);
    const [showDeletePrompt, setShowDeletePrompt] = useState(false);
    const [showRouterPrompt, setShowRouterPrompt] = useState(false);

    const { id } = useParams();
    const query = useQuery();
    const editMode = query.get("edit");
    const history = useHistory();

    const dispatch = useDispatch();

    const category = useSelector((state) => {
        return state.ProductCategory.data;
    });

    const initialProductCategory = useSelector((state) => {
        return state.ProductCategory.initial;
    });

    const { invalidName, invalidClass, invalidType } = useSelector((state) => {
        return state.ProductCategory;
    });

    useEffect(() => {
        if (!id || id === "new") {
            history.replace("/products/categories/new?edit=true");
        } else {
            dispatch(fetchProductCategoryById({ id }));
        }
        if (editMode) {
            dispatch(fetchAllProductCategories());
        }
        setEditable(editMode && editMode !== "false");
        setShowRouterPrompt(!!editMode);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, editMode]);

    useEffect(() => {
        if (category.id) {
            dispatch(
                setBreadcrumbItems(category.name, [
                    { title: "Main", link: "#" },
                    { title: "Products", link: "#" },
                    { title: "Product Categories", link: "#" },
                ])
            );
        } else {
            dispatch(
                setBreadcrumbItems("New Category", [
                    { title: "Main", link: "#" },
                    { title: "Products", link: "#" },
                    { title: "Product Categories", link: "#" },
                ])
            );
        }
        setChanged(isChanged());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category]);

    function isChanged() {
        return (
            initialProductCategory &&
            JSON.stringify(
                (({ id, name, parentCategoryId }) => ({
                    id,
                    name,
                    parentCategoryId,
                }))(initialProductCategory)
            ) !==
                JSON.stringify(
                    (({ id, name, parentCategoryId }) => ({
                        id,
                        name,
                        parentCategoryId,
                    }))(category)
                )
        );
    }

    function onChange(e) {
        dispatch(
            setProductCategoryDetails({
                [e.target.name]: e.target.value,
            })
        );
    }

    function onSave() {
        if (!category.name) {
            dispatch(setProductCategoryInvalidName(!category.name));
            return;
        }
        if (invalidName || invalidClass || invalidType) {
            return;
        }
        if (!isChanged()) {
            history.push("/products/categories/" + id);
        } else if (category.id) {
            dispatch(
                updateProductCategory({
                    data: category,
                    parentCategoryId: category.parentCategoryId,
                    success: () => {
                        history.push(`/products/categories/${category.id}`);
                    },
                })
            );
        } else {
            dispatch(
                createProductCategory({
                    data: category,
                    categoryId: category.parentCategoryId,
                    success: (category) => {
                        history.push(`/products/categories/${category.id}`);
                    },
                })
            );
        }
    }

    function onEdit() {
        history.push({
            pathname: `/products/categories/${id}`,
            search: "?edit=true",
        });
    }

    function onDelete() {
        setShowDeletePrompt(!!category.id);
    }

    return (
        <React.Fragment>
            <DeleteGuard
                when={showDeletePrompt}
                confirm={() => {
                    dispatch(deleteProductCategory(category.id));
                    setShowRouterPrompt(false);
                }}
                close={() => {
                    setShowDeletePrompt(false);
                }}
                content="This cannot be undone. Are you sure want to delete this category?"
            />
            <RouteLeavingGuard
                when={showRouterPrompt}
                navigate={(path) => {
                    history.push(path);
                }}
                shouldBlockNavigation={() => editMode && isChanged()}
                content="There are unsaved changes. Are you sure want to leave this page?"
            />
            <ProductCategoryInner
                {...{
                    category,
                    editable,
                    changed,
                    onChange,
                    onSave,
                    onEdit,
                    onDelete,
                }}
            />
        </React.Fragment>
    );
}
