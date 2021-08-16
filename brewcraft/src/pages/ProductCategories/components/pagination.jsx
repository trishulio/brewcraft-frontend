import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setProductCategoriesPageIndex,
    setProductCategoriesPageSize
} from "../../../store/actions";
import Pagination from "../../../component/Common/pagination";

export default function ProductCategoriesPagination({ children }) {

    const dispatch = useDispatch();

    const { totalElements, totalPages, pageIndex, pageSize , content } = useSelector(state => {
        return state.ProductCategories;
    });

    const pageProps = {
        items: content,
        totalElements,
        totalPages,
        pageIndex,
        pageSize,
        setPageIndex: index => {
            dispatch(setProductCategoriesPageIndex(index));
        },
        setPageSize: size => {
            dispatch(setProductCategoriesPageSize(size));
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