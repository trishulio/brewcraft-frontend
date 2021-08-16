import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../component/Common/pagination";
import {
    setProductsPageIndex,
    setProductsPageSize
} from "../../../store/actions";

export default function ProductsPagination({ children }) {

    const dispatch = useDispatch();

    const products = useSelector(state => {
        return state.Products.content;
    });

    const { totalElements, totalPages, pageIndex, pageSize } = useSelector(state => {
        return state.Products;
    });

    const pageProps = {
        items: products,
        totalElements,
        totalPages,
        pageIndex,
        pageSize,
        setPageIndex: index => {
            dispatch(setProductsPageIndex(index));
        },
        setPageSize: size => {
            dispatch(setProductsPageSize(size));
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