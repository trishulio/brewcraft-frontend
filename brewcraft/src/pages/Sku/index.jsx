import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
    setBreadcrumbItems,
    fetchSkuById,
    createSku,
    updateSku,
    deleteSku,
    fetchAllSkus,
    setSkuDetails
} from "../../store/actions";
import {
    useQuery
} from "../../helpers/utils";
import DeleteGuard from "../../component/Prompt/DeleteGuard";
import RouteLeavingGuard from "../../component/Prompt/RouteLeavingGuard";
import SkuInner from "./sku";

export default function Sku() {
    const [editable, setEditable] = useState(false);
    const [changed, setChanged] = useState(false);
    const [showDeletePrompt, setShowDeletePrompt] = useState(false);
    const [showRouterPrompt, setShowRouterPrompt] = useState(false);

    const { id } = useParams();
    const query = useQuery();
    const editMode = query.get("edit");
    const history = useHistory();

    const dispatch = useDispatch();

    const sku = useSelector(state => {
        return state.Sku.data;
    });

    const initialSku = useSelector(state => {
        return state.Sku.initial;
    });

    useEffect(() => {
        if (!id || id === "new") {
            history.replace("/sku/new?edit=true");
        } else {
            dispatch(fetchSkuById({ id }));
        }
        if (editMode) {
            dispatch(fetchAllSkus());
        }
        setEditable(editMode && editMode !== "false");
        setShowRouterPrompt(!!editMode);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, editMode]);

    useEffect(() => {
        if (sku.id) {
            dispatch(setBreadcrumbItems(sku.name, [
                { title: "Main", link: "#" },
                { title: "Products", link: "#" },
                { title: "SKU", link: "#" }]
            ));
        } else {
            dispatch(setBreadcrumbItems("New SKU", [
                { title: "Main", link: "#" },
                { title: "Products", link: "#" },
                { title: "SKU", link: "#" }]
            ));
        }
        setChanged(isChanged());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sku]);

    function isChanged() {
        return JSON.stringify(
                (({ id, name, parentCategoryId }) => ({ id, name, parentCategoryId }))(initialSku))
            !== JSON.stringify(
                (({ id, name, parentCategoryId }) => ({ id, name, parentCategoryId }))(sku))
    }

    function onChange(e) {
        dispatch(
            setSkuDetails({
                [e.target.name]: e.target.value
            })
        );
    }

    function onSave() {
        if (!isChanged()) {
            history.push("/sku/" + id);

        } else if (sku.id) {
            dispatch(
                updateSku({
                    data: sku,
                    parentCategoryId: sku.parentCategoryId,
                    success: () => {
                        history.push(`/sku/${sku.id}`);
                    }
                })
            );
        } else {
            dispatch(
                createSku({
                    data: sku,
                    skuId: sku.id,
                    success: sku => {
                        history.push(`/sku/${sku.id}`);
                    }
                })
            );
        }
    }

    function onEdit() {
        history.push({
            pathname: `/sku/${id}`,
            search: "?edit=true"
        });
    }

    function onDelete() {
        setShowDeletePrompt(!!sku.id);
    }

    return (
        <React.Fragment>
            <DeleteGuard
                when={showDeletePrompt}
                confirm={() => {
                    dispatch(deleteSku(sku.id));
                    setShowRouterPrompt(false);
                }}
                close={() => {
                    setShowDeletePrompt(false);
                }}
                content="This cannot be undone. Are you sure want to delete this sku?"
            />
            <RouteLeavingGuard
                when={showRouterPrompt}
                navigate={path => {
                    history.push(path);
                }}
                shouldBlockNavigation={() => editMode && isChanged()}
                content="There are unsaved changes. Are you sure want to leave this page?"
            />
            <SkuInner {...{sku, editable, changed, onChange, onSave, onEdit, onDelete}} />
        </React.Fragment>
    );
}