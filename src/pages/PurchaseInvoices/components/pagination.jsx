import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setProcurementsPageIndex,
    setProcurementsPageSize,
} from "../../../store/actions";
import Pagination from "../../../component/Common/pagination";

export default function PurchaseInvoicesPagination({ fetchPage, children }) {
    const dispatch = useDispatch();

    const { totalElements, totalPages, pageIndex, pageSize, content } =
        useSelector((state) => {
            return state.Procurements;
        });

    const pageProps = {
        items: content,
        totalElements,
        totalPages,
        pageIndex,
        pageSize,
        fetchItems: fetchPage,
        setPageIndex: (index) => {
            dispatch(setProcurementsPageIndex(index));
        },
        setPageSize: (size) => {
            dispatch(setProcurementsPageSize(size));
        },
    };

    return (
        <React.Fragment>
            <Pagination {...pageProps}>{children}</Pagination>
        </React.Fragment>
    );
}
