import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, useLocation } from "react-router-dom";
import {
    setBreadcrumbItems,
    fetchBatch
} from "../../store/actions";
import BatchInner from "./batch";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function Brew() {
    const [editable, setEditable] = useState(false);
    const [initialBatch, setInitialBatch] = useState(null);
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const query = useQuery();
    const editMode = query.get("edit");

    const batch = useSelector((state) => {
        return state.Batch.data;
    });

    useEffect(() => {
        if (!id || id === "new") {
            history.replace("/batches/new?edit=true");
        } else {
            dispatch(fetchBatch(id));
        }
    }, [id]);

    useEffect(() => {
        if (batch.id) {
            dispatch(
                setBreadcrumbItems(batch.name, [
                    { title: "Main", link: "#" },
                    { title: "Batches", link: "#" }
                ]),
            );
        } else {
            dispatch(
                setBreadcrumbItems("New Batch", [
                    { title: "Main", link: "#" },
                    { title: "Batches", link: "#" }
                ]),
            );
        }

    }, [batch]);

    useEffect(() => {
        setEditMode(editMode && editMode !== "false");
    }, [editMode]);

    function setEditMode(editable) {
        if (editable) {
            setInitialBatch({
                ...batch
            });
        }
        setEditable(editable);
    }

    const props = {
        id,
        batch,
        editable
    };
    return (
        <BatchInner { ...props } />
    );
}