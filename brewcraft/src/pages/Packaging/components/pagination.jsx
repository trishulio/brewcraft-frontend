import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setPackagingPageIndex,
    setPackagingPageSize
} from "../../../store/actions";
import Pagination from "../../../component/Common/pagination";

export default function PackagingPagination({ fetchPage, children }) {

    const dispatch = useDispatch();

    const { totalElements, totalPages, pageIndex, pageSize , content } = useSelector(state => {
        return state.Packaging;
    });

    const pageProps = {
        items: content,
        totalElements,
        totalPages,
        pageIndex,
        pageSize,
        fetchItems: fetchPage,
        setPageIndex: index => {
            dispatch(setPackagingPageIndex(index));
        },
        setPageSize: size => {
            dispatch(setPackagingPageSize(size));
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