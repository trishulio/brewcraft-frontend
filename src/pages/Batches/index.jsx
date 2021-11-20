import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "../../helpers/utils";
import {
    fetchBatches,
    fetchAllProducts,
    setBreadcrumbItems
} from "../../store/actions";
import BatchesInner from "./batches";

export default function Batches() {
    const dispatch = useDispatch();
    const query = useQuery();
    const product = query.get("product");
    const batchFrom = query.get("batchFrom");
    const batchTo = query.get("batchTo");
    const sort = query.get("sort");
    const order = query.get("order");

    const batches = useSelector(state => {
        return state.Batches.content;
    });

    const { pageIndex, pageSize } = useSelector(state => {
        return state.Batches;
    });

    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Batches", [
                { title: "Main", link: "#" },
                { title: "Batches", link: "#" }
            ])
        );
    }, [dispatch]);

    useEffect(() => {
        const props = {
            pageIndex, pageSize, product, batchFrom, batchTo, sort, order
        };
        props.stageTaskId = 7 // brews that have a ferment stage are batches
        dispatch(fetchBatches({ ...props }));
        dispatch(fetchAllProducts());

    }, [pageIndex, pageSize, product, batchFrom, batchTo, sort, order, dispatch]);

    return (
        <BatchesInner
            batches={batches}
        />
    );
}