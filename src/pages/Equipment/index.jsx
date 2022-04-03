import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "../../helpers/utils";
import {
    fetchEquipment,
    setBreadcrumbItems,
    fetchAllMaterialCategories,
} from "../../store/actions";
import EquipmentInner from "./equipment";

export default function Equipment() {
    const dispatch = useDispatch();
    const query = useQuery();
    const parentCategoryId = query.get("category");
    const sort = query.get("sort");
    const order = query.get("order");

    const equipment = useSelector((state) => {
        return state.Equipment.content;
    });

    const { pageIndex, pageSize } = useSelector((state) => {
        return state.Equipment;
    });

    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Equipment", [
                { title: "Main", link: "#" },
                { title: "Materials", link: "#" },
            ])
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const props = {
            pageIndex,
            pageSize,
            parentCategoryId,
            sort,
            order,
        };
        dispatch(fetchEquipment({ ...props }));
        dispatch(fetchAllMaterialCategories());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, parentCategoryId, sort, order]);

    return <EquipmentInner equipment={equipment} />;
}
