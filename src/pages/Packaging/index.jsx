import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "../../helpers/utils";
import {
    fetchPackaging,
    setBreadcrumbItems,
    fetchAllMaterialCategories,
} from "../../store/actions";
import PackagingInner from "./packaging";

export default function Packaging() {
    const dispatch = useDispatch();
    const query = useQuery();
    const parentCategoryId = query.get("category");
    const sort = query.get("sort");
    const order = query.get("order");

    const packaging = useSelector((state) => {
        return state.Packaging.content;
    });

    const { pageIndex, pageSize } = useSelector((state) => {
        return state.Packaging;
    });

    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Packaging", [
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
        dispatch(fetchPackaging({ ...props }));
        dispatch(fetchAllMaterialCategories());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, parentCategoryId, sort, order]);

    return <PackagingInner packaging={packaging} />;
}
