import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setMaterialCategoriesPageIndex,
    setMaterialCategoriesPageSize,
} from "../../../store/actions";
import Pagination from "../../../component/Common/pagination";

export default function MaterialCategoriesPagination({ children }) {
    const dispatch = useDispatch();

    const { totalElements, totalPages, pageIndex, pageSize, content } =
        useSelector((state) => {
            return state.MaterialCategories;
        });

    const pageProps = {
        items: content,
        totalElements,
        totalPages,
        pageIndex,
        pageSize,
        setPageIndex: (index) => {
            dispatch(setMaterialCategoriesPageIndex(index));
        },
        setPageSize: (size) => {
            dispatch(setMaterialCategoriesPageSize(size));
        },
    };

    return (
        <React.Fragment>
            <Pagination {...pageProps}>{children}</Pagination>
        </React.Fragment>
    );
}
