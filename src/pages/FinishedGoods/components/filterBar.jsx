import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    FilterBar,
    stateToOptionsMultiple,
} from "../../../component/Layout/VerticalLayout/FilterBar";
import { useQuery } from "../../../helpers/utils";

function FilterBarFinishedGoods() {
    const query = useQuery();
    const history = useHistory();

    const [skuIds, setSkus] = useState(query.get("sku_ids"));
    const [productIds, setProducts] = useState(query.get("product_ids"));
    const [brewBatchIds, setBrewBatches] = useState(
        query.get("brew_batch_ids")
    );
    const [isFormChanged, setIsFormChanged] = useState(false);

    const skus = useSelector((state) => {
        return state.Skus.all;
    });

    const products = useSelector((state) => {
        return state.Products.all;
    });

    const batches = useSelector((state) => {
        return state.Batches.all;
    });

    useEffect(() => {
        validationFilterFields();
        // eslint-disable-next-line
    }, [skuIds, productIds, brewBatchIds]);

    const finishedGoodsFilterData = [
        {
            id: 0,
            label: "Sku",
            options: stateToOptionsMultiple(skus || []),
            type: "select-multiple",
            value: skuIds,
            onChange: (e) => onSkuChanges(e),
        },
        {
            id: 1,
            label: "Product",
            options: stateToOptionsMultiple(products || []),
            value: productIds,
            type: "select-multiple",
            onChange: (e) => onProductChanges(e),
        },
        {
            id: 2,
            label: "Brew Batch",
            options: (batches || []).map((brew) => {
                return {
                    value: brew.batchId,
                    label: brew.batchId,
                };
            }),
            value: brewBatchIds,
            type: "select-multiple",
            onChange: (e) => onBrewBatchChanges(e),
        },
    ];

    function onSkuChanges(event) {
        if (event) {
            setSkus(event.map((x) => x));
        } else {
            setSkus(null);
        }
    }

    function onProductChanges(event) {
        if (event) {
            setProducts(event.map((x) => x));
        } else {
            setProducts(null);
        }
    }

    function onBrewBatchChanges(event) {
        if (event) {
            setBrewBatches(event.map((x) => x));
        } else {
            setBrewBatches(null);
        }
    }

    function validationFilterFields() {
        if (skuIds || productIds || brewBatchIds) {
            setIsFormChanged(true);
        } else {
            setIsFormChanged(false);
        }
    }

    function clearFilter() {
        setSkus(null);
        setProducts(null);
        setBrewBatches(null);

        history.push(history.location.pathname);
    }

    function saveFilter() {
        query.delete("sku_ids");
        query.delete("product_ids");
        query.delete("brew_batch_ids");

        let queryData = {
            sku_ids: skuIds?.map((c) => c.value),
            product_ids: productIds?.map((t) => t.value),
            brew_batch_ids: brewBatchIds?.map((t) => t.value),
        };

        for (const key in queryData) {
            if (queryData[key]) {
                query.append([key], queryData[key]);
            }
        }

        history.push({ search: decodeURIComponent(query.toString()) });
    }

    return (
        <React.Fragment>
            <FilterBar
                data={finishedGoodsFilterData}
                onSubmitFilter={saveFilter}
                label="FinishedGoodsFilter"
                submitDisabled={!isFormChanged}
                clearFilter={clearFilter}
            />
        </React.Fragment>
    );
}

export default FilterBarFinishedGoods;
