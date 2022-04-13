import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
    setBreadcrumbItems,
    fetchProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    fetchAllProductCategories,
    fetchMeasures,
    resetProductDetails,
} from "../../store/actions";
import { useQuery } from "../../helpers/utils";
import ProductInner from "./product";
import RouteLeavingGuard from "../../component/Prompt/RouteLeavingGuard";
import DeleteGuard from "../../component/Prompt/DeleteGuard";
import {
    setProductDetailsError,
    setProductInvalidName,
    setProductInvalidClass,
    setProductInvalidAbv,
    setProductInvalidImageFile,
} from "../../store/Product/actions";
import { validAmount, isValidName } from "../../helpers/utils";
import { isValidImageFile } from "../../helpers/fileUtils";
import { putFile } from "../../helpers/vfs";

export default function Product() {
    const [editable, setEditable] = useState(false);
    const [changed, setChanged] = useState(false);
    const [showDeletePrompt, setShowDeletePrompt] = useState(false);
    const [showRouterPrompt, setShowRouterPrompt] = useState(false);

    const { id } = useParams();
    const history = useHistory();
    const query = useQuery();
    const editMode = query.get("edit");
    const dispatch = useDispatch();

    const product = useSelector((state) => {
        return state.Product.data;
    });

    const initialProduct = useSelector((state) => {
        return state.Product.initialProduct;
    });

    const abv = useSelector((state) => {
        return state.Measures.data.find((measure) => measure.name === "abv");
    });

    useEffect(() => {
        dispatch(resetProductDetails());
        dispatch(fetchMeasures());
        if (id === "new" && !editMode) {
            history.replace("/products/new?edit=true");
        } else {
            if (id !== "new") {
                dispatch(fetchProductById(id));
            }
            if (editMode && editMode !== "false") {
                dispatch(fetchAllProductCategories());
            }
            setEditable(!!editMode);
            setShowRouterPrompt(!!editMode);
        }
    }, [id, editMode, history, dispatch]);

    useEffect(() => {
        if (product.id) {
            dispatch(
                setBreadcrumbItems(product.name, [
                    { title: "Main", link: "#" },
                    { title: "Products", link: "#" },
                ])
            );
        } else {
            dispatch(
                setBreadcrumbItems("New Product", [
                    { title: "Main", link: "#" },
                    { title: "Products", link: "#" },
                ])
            );
        }
        setChanged(isChanged());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product, dispatch]);

    function isChanged() {
        return (
            JSON.stringify(
                (({
                    id,
                    name,
                    description,
                    productClass,
                    type,
                    style,
                    targetMeasures,
                    imageFile,
                }) => ({
                    id,
                    name,
                    description,
                    productClass,
                    type,
                    style,
                    targetMeasures,
                    imageFile,
                }))(initialProduct)
            ) !==
            JSON.stringify(
                (({
                    id,
                    name,
                    description,
                    productClass,
                    type,
                    style,
                    targetMeasures,
                    imageFile,
                }) => ({
                    id,
                    name,
                    description,
                    productClass,
                    type,
                    style,
                    targetMeasures,
                    imageFile,
                }))(product)
            )
        );
    }

    function getCategoryId() {
        if (product.style) {
            return product.style.id;
        }
        if (product.type) {
            return product.type.id;
        }
        if (product.productClass) {
            return product.productClass.id;
        }
        return null;
    }

    function getTargetMeasures() {
        return product.targetMeasures
            ? product.targetMeasures.map((x) => {
                  return {
                      id: x.id,
                      measureId: x.measure.id,
                      value: x.value,
                  };
              })
            : [];
    }

    async function onSave() {
        if (!isChanged()) {
            history.push("/products/" + id);
            return;
        }

        if (!validateProductInputs(product)) {
            return;
        }

        const selectedImageFile = product.imageFile;
        if (selectedImageFile) {
            const bPutFileSuccess = await putFile(
                product.imageSrc,
                selectedImageFile
            );

            if (!bPutFileSuccess) {
                dispatch(setProductDetailsError(true));
                return;
            }
        }

        if (product.id) {
            dispatch(
                updateProduct({
                    data: product,
                    categoryId: getCategoryId(),
                    targetMeasures: getTargetMeasures(),
                })
            );
        } else {
            dispatch(
                createProduct({
                    data: product,
                    categoryId: getCategoryId(),
                    targetMeasures: getTargetMeasures(),
                })
            );
        }
    }

    function validateProductInputs() {
        let result = true;

        const abvValue = parseFloat(
            product.targetMeasures?.find((elem) => elem.measure?.id === abv?.id)
                ?.value
        );
        if (!validAmount(abvValue)) {
            dispatch(setProductInvalidAbv(true));
            result = false;
        }
        if (!isValidName(product.name)) {
            dispatch(setProductInvalidName(true));
            result = false;
        }
        if (!product.productClass || !product.productClass.id) {
            dispatch(setProductInvalidClass(true));
            result = false;
        }
        if (product.imageFile && !isValidImageFile(product.imageFile)) {
            dispatch(
                setProductInvalidImageFile({
                    invalidImageFile: true,
                    error: true,
                })
            );
            result = false;
        }

        return result;
    }

    function onDelete() {
        setShowDeletePrompt(!!product.id);
    }

    return (
        <React.Fragment>
            <DeleteGuard
                when={showDeletePrompt}
                confirm={() => {
                    dispatch(deleteProduct(product.id));
                    setShowRouterPrompt(false);
                }}
                close={() => {
                    setShowDeletePrompt(false);
                }}
                content="This cannot be undone. Are you sure want to delete this product?"
            />
            <RouteLeavingGuard
                when={showRouterPrompt}
                navigate={(path) => {
                    history.push(path);
                }}
                shouldBlockNavigation={() => editMode && isChanged()}
                content="There are unsaved changes. Are you sure want to leave this page?"
            />
            <ProductInner
                {...{ product, editable, changed, onSave, onDelete }}
            />
        </React.Fragment>
    );
}
