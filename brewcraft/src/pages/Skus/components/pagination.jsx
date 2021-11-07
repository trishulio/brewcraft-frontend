import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setFinishedGoodsPageIndex,
    setFinishedGoodsPageSize
} from "../../../store/actions";
import Pagination from "../../../component/Common/pagination";

export default function FinishedGoodsPagination({ fetchPage, children }) {

    const dispatch = useDispatch();

    const { totalElements, totalPages, pageIndex, pageSize , content } = useSelector(state => {
        return state.FinishedGoods;
    });

    const pageProps = {
        items: content,
        totalElements,
        totalPages,
        pageIndex,
        pageSize,
        fetchItems: fetchPage,
        setPageIndex: index => {
            dispatch(setFinishedGoodsPageIndex(index));
        },
        setPageSize: size => {
            dispatch(setFinishedGoodsPageSize(size));
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