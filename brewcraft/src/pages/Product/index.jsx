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
    resetProductDetails
} from "../../store/actions";
import {
    useQuery
} from "../../helpers/utils";
import ProductInner from "./product";

export default function Product() {
    const [editable, setEditable] = useState(false);
    const [changed, setChanged] = useState(false);

    const { id } = useParams();
    const history = useHistory();
    const query = useQuery();
    const editMode = query.get("edit");
    const dispatch = useDispatch();

    const product = useSelector(state => {
        return state.Product.data;
    });

    const initialProduct = useSelector(state => {
        return state.Product.initialProduct;
    });

    const { invalidName, invalidClass, invalidType } = useSelector(state => {
        return state.Product
    });

    useEffect(() => {
        if (!id || id === "new") {
            dispatch(resetProductDetails());
            history.replace("/products/new?edit=true");
        } else {
            dispatch(fetchProductById(id));
        }
        if (editMode) {
            dispatch(fetchAllProductCategories());
        }
        setEditable(editMode && editMode !== "false");

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, editMode]);

    useEffect(() => {
        if (product.id) {
            dispatch(setBreadcrumbItems(product.name, [
                { title: "Main", link: "#" },
                { title: "Products", link: "#" }]
            ));
        } else {
            dispatch(setBreadcrumbItems("New Product", [
                { title: "Main", link: "#" },
                { title: "Products", link: "#" }]
            ));
        }
        setChanged(isChanged());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product]);

    function isChanged() {
        return JSON.stringify(
                (({ id, name, description, productClass, type, style }) => ({ id, name, description, productClass, type, style }))(initialProduct))
            !== JSON.stringify(
                (({ id, name, description, productClass, type, style }) => ({ id, name, description, productClass, type, style }))(product))
    }

    function getCategoryId() {
        if (product.style) {
            return product.style.id;
        }
        if (product.type) {
            return product.type.id;
        }
        if (product.class) {
            return product.class.id;
        }
        return null;
    }

    function onSave() {
        if (invalidName || invalidClass || invalidType) {
            return;
        }
        if (!isChanged()) {
            history.push("/products/" + id);

        } else if (product.id) {
            dispatch(
                updateProduct({
                    data: product,
                    categoryId: getCategoryId(),
                    success: id => {
                        history.push("/products/" + id);
                    }
                })
            );
        } else {
            dispatch(
                createProduct({
                    data: product,
                    categoryId: getCategoryId(),
                    success: id => {
                        history.push("/products/" + id);
                    }
                })
            );
        }
    }

    function onDelete() {
        if (product.id) {
            dispatch(deleteProduct(id));
        }
    }

    return (
        <ProductInner {...{product, editable, changed, onSave, onDelete}} />
    );
}