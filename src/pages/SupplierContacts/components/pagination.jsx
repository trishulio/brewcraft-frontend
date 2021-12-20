import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setSupplierContactsPageIndex,
    setSupplierContactsPageSize,
} from "../../../store/actions";
import Pagination from "../../../component/Common/pagination";

export default function SupplierContactsPagination({ children }) {
    const dispatch = useDispatch();

    const { totalItems, totalPages, pageIndex, pageSize, content } =
        useSelector((state) => {
            return state.SupplierContacts;
        });

    const pageProps = {
        items: content,
        totalElements: totalItems,
        totalPages,
        pageIndex,
        pageSize,
        setPageIndex: (index) => {
            dispatch(setSupplierContactsPageIndex(index));
        },
        setPageSize: (size) => {
            dispatch(setSupplierContactsPageSize(size));
        },
    };

    return (
        <React.Fragment>
            <Pagination {...pageProps}>{children}</Pagination>
        </React.Fragment>
    );
}
