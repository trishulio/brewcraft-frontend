import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFinishedGood, fetchFinishedGoods } from "../../store/actions";

export default function FinishedGoods(props) {

    const dispatch = useDispatch();

    const { data: batch, save } = useSelector(state => {
        return state.Batch.Batch;
    })

    const { content: fermentFinishedGoods, initial: initialFermentFinishedGoods } = useSelector(state => {
        return state.Batch.FermentFinishedGoods;
    });

    const isChanged = useCallback(() => {
        return JSON.stringify(fermentFinishedGoods) !== JSON.stringify(initialFermentFinishedGoods);
    }, [
        initialFermentFinishedGoods,
        fermentFinishedGoods
    ]);

    useEffect(() => {
        if (batch.id) {
            dispatch(fetchFinishedGoods());
        }
    }, [batch.id, dispatch]);

    useEffect(() => {
        props.setFinishedGoodsChanged(isChanged());
    }, [
        fermentFinishedGoods,
        props,
        isChanged
    ]);

    useEffect(() => {
        if (save && isFinishedGoodsChanged(fermentFinishedGoods, initialFermentFinishedGoods)) {
            fermentFinishedGoods
                .filter(fg => !initialFermentFinishedGoods.some(ifg => fg.id === ifg.id))
                .forEach(fg => {
                    dispatch(
                        createFinishedGood({
                            form: {
                                skuId: fg.sku.id,
                                mixturePortions: fg.mixturePortions.map(mp => ({
                                    mixtureId: mp.mixture.id,
                                    quantity: {
                                        ...mp.quantity
                                    }
                                })),
                                materialPortions: [], //fg.materialPortions
                            }
                        })
                    );
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [save]);

    function isFinishedGoodsChanged(finishedGoods, initialFinishedGoods) {
        return JSON.stringify(finishedGoods) !== JSON.stringify(initialFinishedGoods);
    }

    return (
        <React.Fragment>{props.children}</React.Fragment>
    )
}