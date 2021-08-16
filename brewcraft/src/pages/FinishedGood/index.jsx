import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
    setBreadcrumbItems,
    fetchFinishedGoodById,
    createFinishedGood,
    updateFinishedGood,
    deleteFinishedGood,
    fetchAllProductCategories,
    resetFinishedGoodDetails
} from "../../store/actions";
import {
    useQuery
} from "../../helpers/utils";
import FinishedGoodInner from "./finished-good";

export default function FinishedGood() {
    const [editable, setEditable] = useState(false);
    const [changed, setChanged] = useState(false);

    const { id } = useParams();
    const history = useHistory();
    const query = useQuery();
    const editMode = query.get("edit");
    const dispatch = useDispatch();

    const finishedGood = useSelector(state => {
        return state.FinishedGood.data;
    });

    const initialFinishedGood = useSelector(state => {
        return state.FinishedGood.initialFinishedGood;
    });

    const { invalidName } = useSelector(state => {
        return state.FinishedGood
    });

    useEffect(() => {
        if (!id || id === "new") {
            dispatch(resetFinishedGoodDetails());
            history.replace("/finished-goods/new?edit=true");
        } else {
            dispatch(fetchFinishedGoodById(id));
        }
        if (editMode) {
            dispatch(fetchAllProductCategories());
        }
        setEditable(editMode && editMode !== "false");

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, editMode]);

    useEffect(() => {
        if (finishedGood.id) {
            dispatch(setBreadcrumbItems(finishedGood.name, [
                { title: "Main", link: "#" },
                { title: "Finished Goods", link: "#" }]
            ));
        } else {
            dispatch(setBreadcrumbItems("New Finished Good", [
                { title: "Main", link: "#" },
                { title: "Finished Goods", link: "#" }]
            ));
        }
        setChanged(isChanged());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [finishedGood]);

    function isChanged() {
        return JSON.stringify(
                (({ id, name, description }) => ({ id, name, description }))(initialFinishedGood))
            !== JSON.stringify(
                (({ id, name, description }) => ({ id, name, description }))(finishedGood))
    }

    function onSave() {
        if (invalidName) {
            return;
        }
        if (!isChanged()) {
            history.push("/finished-goods/" + id);

        } else if (finishedGood.id) {
            dispatch(
                updateFinishedGood({
                    data: finishedGood,
                    success: id => {
                        history.push("/finished-goods/" + id);
                    }
                })
            );
        } else {
            dispatch(
                createFinishedGood({
                    data: finishedGood,
                    success: id => {
                        history.push("/finished-goods/" + id);
                    }
                })
            );
        }
    }

    function onDelete() {
        if (finishedGood.id) {
            dispatch(deleteFinishedGood(id));
        }
    }

    return (
        <FinishedGoodInner {...{editable, changed, onSave, onDelete}} />
    );
}