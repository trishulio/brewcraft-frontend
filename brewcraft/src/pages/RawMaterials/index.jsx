import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "../../helpers/utils";
import {
    fetchRawMaterials,
    fetchAllMaterials,
    setBreadcrumbItems
} from "../../store/actions";
import RawMaterialsInner from "./raw-materials";

export default function RawMaterials() {
    const dispatch = useDispatch();
    const query = useQuery();
    const materialId = query.get("material");
    const sort = query.get("sort");
    const order = query.get("order");

    const { pageIndex, pageSize } = useSelector(state => {
        return state.RawMaterials;
    });

    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Raw Materials", [
                { title: "Main", link: "#" },
                { title: "Raw Materials", link: "#" }
            ]),
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const props = {
            pageIndex, pageSize, materialId, sort, order
        };
        dispatch(fetchRawMaterials({ ...props }));
        dispatch(fetchAllMaterials());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, materialId, sort, order]);

    return (
        <RawMaterialsInner />
    );
}