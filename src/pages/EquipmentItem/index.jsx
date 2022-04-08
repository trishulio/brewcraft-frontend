import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
    setBreadcrumbItems,
    fetchEquipmentItem,
    createEquipmentItem,
    updateEquipmentItem,
    deleteEquipmentItem,
    resetEquipmentItem,
} from "../../store/actions";
import { useQuery } from "../../helpers/utils";
import EquipmentInner from "./equipment-item";
import DeleteGuard from "../../component/Prompt/DeleteGuard";
import RouteLeavingGuard from "../../component/Prompt/RouteLeavingGuard";

export default function EquipmentItem() {
    const [editable, setEditable] = useState(false);
    const [changed, setChanged] = useState(false);
    const [showDeletePrompt, setShowDeletePrompt] = useState(false);
    const [showRouterPrompt, setShowRouterPrompt] = useState(false);

    const { id } = useParams();
    const history = useHistory();
    const query = useQuery();
    const editMode = query.get("edit");
    const dispatch = useDispatch();

    const equipment = useSelector((state) => {
        return state.EquipmentItem.data;
    });

    const initialEquipment = useSelector((state) => {
        return state.EquipmentItem.initial;
    });

    const isChanged = useCallback(() => {
        return JSON.stringify(initialEquipment) !== JSON.stringify(equipment);
    }, [initialEquipment, equipment]);

    useEffect(() => {
        if (id === "new") {
            history.replace("/equipment/new?edit=true");
            dispatch(resetEquipmentItem());
        } else {
            dispatch(fetchEquipmentItem({ id }));
        }
        setEditable(editMode && editMode !== "false");
        setShowRouterPrompt(!!editMode);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, editMode]);

    useEffect(() => {
        if (initialEquipment.id) {
            dispatch(
                setBreadcrumbItems(initialEquipment.name, [
                    { title: "Main", link: "#" },
                    { title: "Equipment", link: "#" },
                ])
            );
        } else {
            dispatch(
                setBreadcrumbItems("New Equipment", [
                    { title: "Main", link: "#" },
                    { title: "Equipment", link: "#" },
                ])
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialEquipment]);

    useEffect(() => {
        setChanged(isChanged());
    }, [equipment, isChanged]);

    function onSave() {
        if (!equipment.id) {
            dispatch(createEquipmentItem());
        } else {
            dispatch(updateEquipmentItem());
        }
    }

    function onDelete() {
        setShowDeletePrompt(!!equipment.id);
    }

    const props = {
        editable,
        changed,
        onSave,
        onDelete,
    };

    return (
        <React.Fragment>
            <DeleteGuard
                when={showDeletePrompt}
                confirm={() => {
                    dispatch(deleteEquipmentItem(equipment.id));
                    setShowRouterPrompt(false);
                }}
                close={() => {
                    setShowDeletePrompt(false);
                }}
                content="This cannot be undone. Are you sure want to delete this equipment?"
            />
            <RouteLeavingGuard
                when={showRouterPrompt}
                navigate={(path) => {
                    history.push(path);
                }}
                shouldBlockNavigation={() =>
                    equipment.id && editMode && isChanged()
                }
                content="There are unsaved changes. Are you sure want to leave this page?"
            />
            <EquipmentInner {...props} />
        </React.Fragment>
    );
}
