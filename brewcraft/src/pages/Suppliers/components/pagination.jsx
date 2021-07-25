import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setSuppliersPageIndex,
    setSuppliersPageSize
} from "../../../store/actions";
import Pagination from "../../../component/Common/pagination";

export default function SuppliersPagination({ fetchPage, children }) {

    const dispatch = useDispatch();

    const { totalItems, totalPages, pageIndex, pageSize , content } = useSelector(state => {
        return state.Suppliers;
    });

    const pageProps = {
        items: content,
        totalElements: totalItems,
        totalPages,
        pageIndex,
        pageSize,
        fetchItems: fetchPage,
        setPageIndex: index => {
            dispatch(setSuppliersPageIndex(index));
        },
        setPageSize: size => {
            dispatch(setSuppliersPageSize(size));
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