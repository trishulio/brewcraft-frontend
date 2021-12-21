import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setIngredientsPageIndex,
    setIngredientsPageSize,
} from "../../../store/actions";
import Pagination from "../../../component/Common/pagination";

export default function IngredientsPagination({ fetchPage, children }) {
    const dispatch = useDispatch();

    const { totalElements, totalPages, pageIndex, pageSize, content } =
        useSelector((state) => {
            return state.Ingredients;
        });

    const pageProps = {
        items: content,
        totalElements,
        totalPages,
        pageIndex,
        pageSize,
        fetchItems: fetchPage,
        setPageIndex: (index) => {
            dispatch(setIngredientsPageIndex(index));
        },
        setPageSize: (size) => {
            dispatch(setIngredientsPageSize(size));
        },
    };

    return (
        <React.Fragment>
            <Pagination {...pageProps}>{children}</Pagination>
        </React.Fragment>
    );
}
