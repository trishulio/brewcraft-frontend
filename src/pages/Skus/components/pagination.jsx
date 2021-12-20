import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSkusPageIndex, setSkusPageSize } from "../../../store/actions";
import Pagination from "../../../component/Common/pagination";

export default function SkusPagination({ fetchPage, children }) {
    const dispatch = useDispatch();

    const { totalElements, totalPages, pageIndex, pageSize, content } =
        useSelector((state) => {
            return state.Skus;
        });

    const pageProps = {
        items: content,
        totalElements,
        totalPages,
        pageIndex,
        pageSize,
        fetchItems: fetchPage,
        setPageIndex: (index) => {
            dispatch(setSkusPageIndex(index));
        },
        setPageSize: (size) => {
            dispatch(setSkusPageSize(size));
        },
    };

    return (
        <React.Fragment>
            <Pagination {...pageProps}>{children}</Pagination>
        </React.Fragment>
    );
}
