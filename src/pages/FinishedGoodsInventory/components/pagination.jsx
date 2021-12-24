import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setFinishedGoodsInventoryPageIndex,
    setFinishedGoodsInventoryPageSize
} from "../../../store/actions";
import Pagination from "../../../component/Common/pagination";

export default function FinishedGoodsInventoryPagination({ children }) {

    const dispatch = useDispatch();

    const finishedGoodsInventory = useSelector(state => {
        return state.FinishedGoodsInventory.content;
    });

    const { totalElements, totalPages, pageIndex, pageSize } = useSelector(state => {
        return state.FinishedGoodsInventory;
    });

    const pageProps = {
        items: finishedGoodsInventory,
        totalElements,
        totalPages,
        pageIndex,
        pageSize,
        setPageIndex: index => {
            dispatch(setFinishedGoodsInventoryPageIndex(index));
        },
        setPageSize: size => {
            dispatch(setFinishedGoodsInventoryPageSize(size));
        }
    };

    return (
        <React.Fragment>
            <Pagination {...pageProps}>
                {children}
            </Pagination>
        </React.Fragment>
    );
}