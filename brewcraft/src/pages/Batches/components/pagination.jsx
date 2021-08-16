import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setBatchesPageIndex,
    setBatchesPageSize
} from "../../../store/actions";
import Pagination from "../../../component/Common/pagination";

export default function BatchesPagination({ children }) {

    const dispatch = useDispatch();

    const { totalElements, totalPages, pageIndex, pageSize , content } = useSelector(state => {
        return state.Batches;
    });

    const pageProps = {
        items: content,
        totalElements,
        totalPages,
        pageIndex,
        pageSize,
        setPageIndex: index => {
            dispatch(setBatchesPageIndex(index));
        },
        setPageSize: size => {
            dispatch(setBatchesPageSize(size));
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