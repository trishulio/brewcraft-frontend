import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setCompaniesPageIndex,
    setCompaniesPageSize
} from "../../../store/actions";
import Pagination from "../../../component/Common/pagination";

export default function CompaniesPagination({ fetchPage, children }) {

    const dispatch = useDispatch();

    const { totalItems, totalPages, pageIndex, pageSize , content } = useSelector(state => {
        return state.Companies;
    });

    const pageProps = {
        items: content,
        totalElements: totalItems,
        totalPages,
        pageIndex,
        pageSize,
        fetchItems: fetchPage,
        setPageIndex: index => {
            dispatch(setCompaniesPageIndex(index));
        },
        setPageSize: size => {
            dispatch(setCompaniesPageSize(size));
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