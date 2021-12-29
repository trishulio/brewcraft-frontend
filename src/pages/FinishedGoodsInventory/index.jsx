import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchFinishedGoodsInventory,
    setBreadcrumbItems,
} from "../../store/actions";
import { useQuery } from "../../helpers/utils";
import FinishedGoodsInventoryInner from "./finishedgoodsinventory";

export default function FinishedGoodsInventory() {
    const dispatch = useDispatch();
    const query = useQuery();
    const sort = query.get("sort");
    const order = query.get("order");

    const { pageIndex, pageSize } = useSelector((state) => {
        return state.FinishedGoodsInventory;
    });

    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Finished Goods Inventory", [
                { title: "Main", link: "#" },
                { title: "Finished Goods Inventory", link: "#" },
            ])
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const props = {
            pageIndex,
            pageSize,
            sort,
            order,
        };
        dispatch(fetchFinishedGoodsInventory({ ...props }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, sort, order]);

    return <FinishedGoodsInventoryInner />;
}
