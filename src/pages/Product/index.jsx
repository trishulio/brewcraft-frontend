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
    setProductInvalidName,
    setProductInvalidClass,
    setProductInvalidAbv,
} from "../../store/Product/actions";
import { validAmount } from "../../helpers/utils";

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

    const measures = useSelector((state) => {
        return state.Measures.data;
    });

    const abv = measures?.find(measure => measure.name === 'abv');

    const { invalidName, invalidClass, invalidType, invalidAbv } = useSelector((state) => {
        return state.Product;
    });

    useEffect(() => {
        dispatch(fetchMeasures());
        if (id === "new" && !editMode) {
            history.replace("/products/new?edit=true");
        } else {
            if (id === "new") {
                dispatch(resetProductDetails());
            } else {
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
                (({ id, name, description, productClass, type, style, targetMeasures }) => ({
                    id,
                    name,
                    description,
                    productClass,
                    type,
                    style,
                    targetMeasures
                }))(initialProduct)
            ) !==
            JSON.stringify(
                (({ id, name, description, productClass, type, style, targetMeasures }) => ({
                    id,
                    name,
                    description,
                    productClass,
                    type,
                    style,
                    targetMeasures
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
        return product.targetMeasures ? product.targetMeasures.map(x => {
            return {
                id: x.id,
                measureId: x.measure.id,
                value: x.value,
            };
        }) : []
    }

    function onSave() {
        const abvValue = parseFloat(product.targetMeasures?.find(elem => elem.measure?.id === abv?.id)?.value);
        if (!product.name || !product.productClass?.id || !validAmount(abvValue)) {
            dispatch(setProductInvalidName(!product.name));
            dispatch(setProductInvalidClass(!product.productClass?.id));
            dispatch(setProductInvalidAbv(!validAmount(abvValue)));
            return;
        }
        if (invalidName || invalidClass || invalidType || invalidAbv) {
            return;
        }
        if (!isChanged()) {
            history.push("/products/" + id);
        } else if (product.id) {
            dispatch(
                updateProduct({
                    data: product,
                    categoryId: getCategoryId(),
                    targetMeasures: getTargetMeasures()
                })
            );
        } else {
            dispatch(
                createProduct({
                    data: product,
                    categoryId: getCategoryId(),
                    targetMeasures: getTargetMeasures()
                })
            );
        }
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
